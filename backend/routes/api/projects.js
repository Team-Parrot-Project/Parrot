var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const User = mongoose.model('User');
const Notification = mongoose.model('Notification');
const { isProduction } = require('../../config/keys');
const { requireUser } = require('../../config/passport');
const { userOnProject, taskProtector, stringifyCompare, blockingTaskCheck, arrayDiff } = require('../../config/util');
const jbuilder = require('jbuilder');
const { Task } = require('../../models/Project');

router.get('/:projectid', requireUser, async (req,res,next)=>{
    const projectId = req.params.projectid

    // get the project
    const project = await Project.findOne({"_id":`${projectId}`})

    // need to make sure the currently logged in user is either a collaborator or an admin of the project
    if (project && userOnProject(project, req.user._id)) {

        let baseProject = Object.fromEntries(
            [
                ['_id', project._id],
                ['title', project.title],
                ['description', project.description],
                ['adminId', project.adminId],
                ['startDate', project.startDate],
                ['endDate', project.endDate],
                ['tasks', project.tasks],
                ['collaborators', project.collaborators]
            ]
        )

        let nestedProject = Object.fromEntries([
            [project._id, baseProject]
        ])

        return res.json(nestedProject);
    } else {
        res.statusCode = 404;
        return res.json({message: "No Project Found"});
    }
});

router.post('/:projectId/tasks', requireUser, async (req,res,next)=>{

    console.log("in POST /:projectId/tasks\n****\n");

    const projectId = req.params.projectId;
    const assigneeId = req.body.assignee;
    const blockingTasks = req.body.blockingTasks;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    console.log(projectId, "projectId\n****\n");
    console.log(assigneeId, "assigneeId\n****\n");

    let fetchedAssignee;
    let project;

    try {
        project = await Project.findOne({"_id":`${projectId}`})
        console.log(project, "project\n****\n");
    } catch(error) {
        return res.json(error);
    }

    // baseline checks - all of these fields must be present in post request, so they will be validated
    if (!project) {
        res.statusCode = 404;
        return res.json({message: "no project found"});
    }
    // the logged in user must always be present and on the task
    else if (!userOnProject(project, req.user._id)) {
        res.statusCode = 403;
        return res.json({message: "logged in user is not a collaborator or admin of the project"});
    }

    // optional field validation - if these are present, we must validate them

    // if there is an assigneeId make sure it is valid by looking for the User and making sure they are an admin or collaborator
    if (assigneeId) {

        try {
            fetchedAssignee = await User.findById(assigneeId);
            console.log(fetchedAssignee, "fetchedAssignee\n****\n");

            const fetchedAssigneeProjectIds = fetchedAssignee.projects.map(p => p.toString());
            console.log(fetchedAssigneeProjectIds, "fetchedAssigneeProjectIds\n****\n");

            const foundProject = fetchedAssigneeProjectIds.includes(projectId);
            console.log(foundProject, "foundProject\n****\n");


            if(!fetchedAssignee) {
                res.statusCode = 404;
                return res.json({message: "Can't find assignee"});
            } else if (!userOnProject(project, assigneeId)) {
                console.log("here");
                res.statusCode = 403;
                return res.json({message: "assignee is not listed as a collaborator on the project"});
            } else if (!foundProject) {
                console.log("there")
                res.statusCode = 403;
                return res.json({message: "assignee does not have this project on their list of projects"});
            }

        } catch (error) {
            return res.json(error);
        }
    }

    // perform other validation, ultimately attempting a save
    const newTask = new Task (req.body);

    if(newTask.blockingTasks?.length > 0) {
        console.log("performing a check of blocking tasks\n****\n")

        const blockCheck = blockingTaskCheck(newTask, project)
        console.log(blockCheck, "blockCheck\n****\n");

        // nesting so I can get the console log above in
        if(!blockCheck) {
            console.log("Stopping POST due to invalue blocking task");
            res.statusCode = 404;
            return res.json({message: "invalid blocking tasks, retry with updated dates or blocking tasks"});
        }
    }

    // at this point all checks have been passed
    project.tasks.push(newTask);
    const newNotification = new Notification({
        message: `Task created by ${req.user.username}`,
        target: "task",
        task: newTask._id,
        project: projectId,
        admin: project.admin,
    })
    if(newNotification){
        req.io.to(projectId).emit("message",newNotification)
    }else{
        req.io.to(project.admin).emit("message","Issue with Notification")
        req.io.to(updatedTask.assignee).emit("message","Issue with Notification")
    }
    try {
        const savedProject = await project.save();
        console.log(savedProject, "savedProject\n****\n");

        const returnedTask = savedProject.tasks.id(newTask._id);
        console.log(returnedTask, "returnedTask\n****\n");

        if(assigneeId) {
            fetchedAssignee.assignedTasks.push(returnedTask._id)

            const savedAssigneeResult = await fetchedAssignee.save();
            console.log(savedAssigneeResult, "savedAssigneeResult\n****\n");
        }

        // embed the project id into the task, for Ryder ;)
        const manipulatedTask = {
            ...returnedTask.toObject(),
            projectId: project._id
            };

        console.log(manipulatedTask, "manipulatedTask\n****\n");

        return res.json(manipulatedTask);
    } catch (error) {
        return res.json(error);
    }
})

router.patch('/:projectId/tasks/:taskId', requireUser, async (req,res,next)=>{

    console.log("in PATCH /:projectId/tasks/:taskId\n****\n");

    const projectId = req.params.projectId;
    console.log(projectId, "projectId\n****\n");

    const incomingAssigneeId = req.body.assignee;
    console.log(incomingAssigneeId, "incomingAssigneeId\n****\n");

    const taskId = req.params.taskId;
    console.log(taskId, "taskId\n****\n");

    const incomingBlockingTasks = req.body.blockingTasks;
    console.log(incomingBlockingTasks, "incomingBlockingTasks\n****\n");

    let project;

    try {
        project = await Project.findOne({"_id":`${projectId}`})
        console.log(project, "project\n****\n");
    } catch (error) {
        return res.json(error);
    }

    const task = project.tasks.id(taskId);
    console.log(task, "task from project\n****\n")

    const priorAssignee = task.assignee;
    const priorBlockingTasks = task.blockingTasks;

    console.log(priorBlockingTasks, "priorBlockingTasks\n****\n");

    console.log(task, "task\n****\n");

    if (project && task && userOnProject(project, req.user._id)) {

        // need to check whether the assignee changed and if so - remove this task from the user's list and add it to the incoming user's list
        const taskPendingSave = Object.assign(task, req.body);
        console.log(taskPendingSave, "taskPendingSave\n****\n")

        // before moving on, need to check that this is a valid task to save in the first place
        try {
            const validateProject = project.validateSync();
            console.log(validateProject, "validateProject\n****\n");
        } catch(error) {
            return res.json(error);
        }

        // if we received an incoming assignee ID we have to check whether it is different and if so make the relevant changes

        console.log(incomingAssigneeId, "**PAY ATTENTION incomingAssigneeId**\n\n")
        console.log(task, "task\n****\n");
        console.log(priorAssignee, "**PAY ATTENTION priorAssignee\n\n")
        console.log(priorAssignee?.toString(), "**PAY ATTENTION priorAssignee.toString()\n\n")

        console.log(incomingAssigneeId !== undefined, "incomingAssigneeId !== undefined");
        console.log(incomingAssigneeId !== priorAssignee?.toString(), "incomingAssigneeId !== priorAssignee?.toString()");
        console.log(incomingAssigneeId !== priorAssignee?.toString(), incomingAssigneeId !== priorAssignee?.toString(), "incomingAssigneeId !== priorAssignee?.toString(), incomingAssigneeId !== priorAssignee?.toString()");

        if(incomingAssigneeId !== undefined && (incomingAssigneeId !== priorAssignee?.toString())) {
            console.log("12345Making an assignee change! \n****\n")
            // first get the newAssignee
            // then remove the task from the old assignee, if there is an old assignee
            try {
                // attempt to remove the task from the existing assignee, if there is an assignee

                if(incomingAssigneeId !== null && !userOnProject(project, incomingAssigneeId)) {
                    return res.json({message: "the incoming assignee is not a collaborator on this project"})
                }

                if(priorAssignee) {
                    console.log(priorAssignee, "**** priorAssignee\n\n")
                    const oldAssignee = await User.findOneAndUpdate (
                        {_id: priorAssignee},
                        {$pull: {assignedTasks: taskId}},
                        {new: true}
                    )
                    console.log(oldAssignee, "oldAssignee\n****\n")

                    // remove assignee from the task (need to do this in here case incomingAssigneeId is null)
                    task.assignee = null;
                    console.log(task, "task post removal\n****\n");
                }

                // then add the task to the new assignee, IF it is a non falsey value. Note if it is undefined, then the prior instance will be removed with the if statement above but this one will not run
                console.log(incomingAssigneeId, "12345 incomingAssigneeId");
                if(incomingAssigneeId) {


                    console.log("12345");
                    const newAssignee = await User.findOneAndUpdate (
                        {_id: incomingAssigneeId},
                        {$addToSet: {assignedTasks: taskId}},
                        {new: true}
                    )
                    console.log(newAssignee, "newAssignee\n****\n")

                    task.assignee = newAssignee._id;
                }

            } catch (error) {
                return res.json(error);
            }

        }

        // the special version to be sent to the back end if the next check passes
        const updatedTask = {
            ...task.toObject(),
            projectId: project._id,
            ...req.body,
        };

        // if incoming blocking tasks has been defined with a non 0 sized array we need to check it
        if(incomingBlockingTasks !== undefined && incomingBlockingTasks?.length > 0) {
            console.log("performing a blocking task check \n****\n");

            const priorBlockingTaskStrings = priorBlockingTasks.map((bt) => {
                return bt.toString();
            })

            // perform a compare of the two arrays utilizing this mongoose method which provides an array containing what was added vs removed between the two
            const {added, removed} = arrayDiff(priorBlockingTaskStrings, incomingBlockingTasks);

            console.log(added, "added to blocking tasks \n****\n")
            console.log(removed, "removed from blocking tasks \n****\n")

            // we don't care about removal, but we do care about adds
            if(added.length > 0) {
                console.log("new blocking tasks present \n****\n");

                const blockCheck = await blockingTaskCheck(updatedTask, project);
                console.log(req.body, "REQ BODY AFTER blockCheck")
                console.log(blockCheck, "blockCheck\n****\n");

                if (!blockCheck) {
                    console.log("Stopping PATCH due to invalue blocking task");
                    return res.json({message: "invalid blocking tasks"});
                }
            }
        }

        console.log(req.body, "req.body full prior to save\n****\n")
        // updating the task with the body
        Object.assign(task, req.body)
        console.log(task, "assigned task after collab \n****\n")
        //

        // saving the project, which will save the task
        // await project.save();
        const newNotification = new Notification({
            message: `Task updated by ${req.user.username}`,
            target: "task",
            task: taskId,
            project: projectId,
            admin: project.admin,
        })
        if(newNotification){
            req.io.to(projectId).emit("message",newNotification)
        }else{
            req.io.to(project.admin).emit("message",{message:"Issue with Notification"})
        }

        // saving the project, which will save the task
        try {
            const savedProject = await project.save();
            console.log(savedProject, "savedProject\n****\n")
        } catch (error) {
            return res.json(error);
        }


        return res.json(updatedTask);

    } else {
        return res.json({message: "No project or save not permitted"});
    }
})

router.delete('/:projectId/tasks/:taskId', requireUser, async (req,res,next)=>{

    const projectId = req.params.projectId;
    const taskId = req.params.taskId;

    const project = await Project.findOne({"_id":`${projectId}`})
    const task = project?.tasks.id(taskId);

    let user;

    if (project && task && userOnProject(project, req.user._id)) {

        // first check whether this task is assigned to a user
        user = await User.findOne({ assignedTasks: taskId });

        // if so we need to delete that task from the user's assigned tasks
        if(user) {
            const assignedTaskIndex = user.assignedTasks.findIndex((tId) => tId.toString() === taskId);

            // delete the element at the discovered index
            user.assignedTasks.splice(assignedTaskIndex,1);

            await user.save();
            console.log(user, "user post save\n****\n");
        }

        // now we remove that task from the project
        const taskIndex = project.tasks.findIndex((t) => t._id.toString() === taskId);

        project.tasks.splice(taskIndex, 1);

        await project.save();

        const newNotification = new Notification({
            message: `Task deleted by ${req.user.username}`,
            target: "task",
            task: taskId,
            project: projectId,
            admin: project.admin,
        })
        if(newNotification){
            req.io.to(projectId).emit("message",newNotification)
        }else{
            req.io.to(project.admin).emit("message",{message:"Issue with Notification"})
        }

        return res.json({message: "Deletion complete"});
    } else {

        return res.json({message: "project or task not found or insufficient priveleges"});
    }


});

router.post('/', async (req,res,next) =>{

    console.log(req.body, "REQ BODY");

    const adminId = req.body.adminId;
    const newProject = new Project({
        title: req.body.title,
        description: req.body.description,
        adminId: req.body.adminId,
        collaborators: [...req.body.collaborators, req.body.adminId],
        tasks: [],
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });

    // console.log(adminId,"adminId\n****\n")
    // const owner = await User.findOne({"_id":`${adminId}`})

    // console.log(newProject, "NEW PROJECT");

    if(await newProject.save()){
        // owner.projects.push(newProject)
        // await owner.save();
        // console.log(newProject._id,"Project _id\n****\n")

        await User.updateMany(
            { _id: { $in: [req.body.adminId].concat(req.body.collaborators) } }, // Match users with the given user IDs
            { $push: { projects: newProject._id } } // Add the project ID to the 'projects' array of each matched user
          )

        return res.json(newProject);
    }else{
        return res.json({message:"Error"})
    }
});

router.patch('/:projectId', requireUser, async (req,res,next) =>{
    
    console.log("in PATCH /:projectId\n****\n");
    const projectId = req.params.projectId
    const project = await Project.findOne({"_id":`${projectId}`})

    // error handling
    if(!project) {
        res.statusCode = 400;
        return res.json({message:"Project Not Found"});
    }

    if(!userOnProject(project, req.user._id)) {
        return res.json({message:"User not authorized to modify this project"})
        // const err = new Error('User not authorized to modify this project');
        // err.statusCode = 401;
        // next(err);
    }

    // if we make it through error handling, it's update time. First need to check whether we need to make collaborator updates

    // if there are collaborators, we need to compare incoming list to the outgoing list to see what removals need to be made from these users
    if (req.project?.collaborators) {
        // get the prior collaborators as a sorted string of IDs
        const priorCollaborators = project.collaborators.map(c => (c.toString())).sort();

        const incomingCollaborators = req.body.collaborators.sort()

        console.log(priorCollaborators, "Prior\n****\n");
        console.log(incomingCollaborators, "Incoming\n****\n");

        const sameCollaborators = stringifyCompare(priorCollaborators, incomingCollaborators);

        if(!sameCollaborators) {
            const removedCollaborators = priorCollaborators.filter(c => !incomingCollaborators.includes(c));
            const addedCollaborators = incomingCollaborators.filter(c => !priorCollaborators.includes(c));

            console.log(removedCollaborators, "removedCollaborators\n****\n");
            console.log(addedCollaborators, "addedCollaborators\n****\n");

            const removeProjectIdsFromUsers = await User.updateMany({_id: {$in: removedCollaborators} }, { $pull: {projects: projectId}})

            const addProjectIdsToUsers = await User.updateMany({_id: {$in: addedCollaborators} }, { $push: {projects: projectId}})

            console.log(removeProjectIdsFromUsers, "results of removing the IDs\n****\n");
            console.log(addProjectIdsToUsers, "results of removing the IDs\n****\n");
        }
    }

    // debugger
    const previousTasks = project.tasks;
    const newTasks = req.body.tasks;

    if (newTasks) {
        newTasks.forEach((t) => {
            console.log(t, "entered task")
            const taskToUpdate = previousTasks.find((checkTask) => {return (checkTask._id.toString() === t._id)})

            console.log(taskToUpdate, "FOUND TASK");
            console.log(t, "t");

            if(taskToUpdate) {
                Object.assign(taskToUpdate, t);
                console.log(taskToUpdate, "Task Post Update");
            }
        })
    }
    
    Object.assign(project, {...req.body, tasks: previousTasks});
    console.log(project, "Project attempting a save");
    const updatedProject = await project.save();
    console.log(updatedProject, "Updated Project!!")

    // const updatedProject = await Project.findOneAndUpdate(
    //     { _id: projectId },
    //     { $set: req.body },
    //     { new: true }
    // );

    if(updatedProject) { 
        const newNotification = new Notification({
            message: `Project Updated by ${req.user.username}`,
            target: "project",
            task: null,
            project: projectId,
            admin: updatedProject.admin,
        })
        console.log("About to send","Notification in Project Patch")
        if(newNotification){
            console.log("Trying to send notification","Notification in Project Patch")
            req.io.to(projectId).emit("message",newNotification)
        }else{
            req.io.to(projectId).emit("message",{message:"Issue with Notification"})
        }
        return res.json(updatedProject);
    } else {
        res.statusCode = 500;
        return res.json({message:"Problem with project update"})
        // const err = new Error('Problem with project update');
        // err.statusCode = 422;
        // next(err);
    }
});


router.delete('/:projectId', requireUser, async (req,res,next) =>{

    console.log("in DELETE /:projectId");

    const projectId = req.params.projectId;

    const project = await Project.findOne({"_id":`${projectId}`});
    // console.log(project, "PROJECT!!");
    // console.log("HERE I AM!!");
    // console.log(req.user._id, "loged in as")

    if(!project) {
        res.statusCode = 404;
        return res.json({message:"No project found"});
    }
    if(!userOnProject(project, req.user._id)) {
        res.statusCode = 403;
        return res.json({message:"User not allowed to modify this project"});
    }

    // remove this project ID from all our user's project lists
    const removeProjectIdsFromUsers = await User.updateMany({}, { $pull: { projects: projectId } });
    console.log(removeProjectIdsFromUsers, "result of removing the project from users");

    // get the tasks from the project, so we can delete them from the user's assigned tasks list
    const tasks = project.tasks;
    console.log("tasks queued up for removal", tasks);

    // convert the tasks list to a taskId list
    const taskIds = tasks.map(t => t._id);
    console.log("task Ids queued up for removal", taskIds);

    // remove these tasks from users
    const removeTaskIdsFromUsers = await User.updateMany({}, {$pull: {assignedTasks: { $in: taskIds} }})
    console.log(removeTaskIdsFromUsers, "result of removing taskIds from users assigned tasks");

    // remove the project
    const deleteResult = await Project.deleteOne({"_id":`${projectId}`});
    console.log(deleteResult, "result of removing the project");

    if(deleteResult.deletedCount === 1) {
        res.statusCode = 200;
        return res.json({message: "Successful Delete"});
    } else {
        res.statusCode = 500;
        return res.json({message:"Issue with Delete"});
    }
});

module.exports = router;
