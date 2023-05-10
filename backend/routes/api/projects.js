var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const User = mongoose.model('User');
const { isProduction } = require('../../config/keys');
const { requireUser } = require('../../config/passport');
const { userOnProject, projectParams, taskProtector, stringifyCompare } = require('../../config/util');
const jbuilder = require('jbuilder');
const { Task } = require('../../models/Project');

// 645a748b33dbf64bdcb0e658

router.get('/:projectid', requireUser, async (req,res,next)=>{
    const projectId = req.params.projectid
    // console.log(req.user._id, "THIS IS THE LOGGED IN USER")

    // get the project
    const project = await Project.findOne({"_id":`${projectId}`})
    // console.log("I AM HERE!!");
    //Probably needs task populate, not collaborator populate

    // console.log(userOnProject(project, req.user._id), "USERONPROJECT?")
    console.log(project, "PROJECT!!");
    // const allP = await Project.find()

    // console.log(returnedProject, "RPRP");
    // return res.json(allP);

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
            ]
        )

        let nestedProject = Object.fromEntries([
            [project._id, baseProject]
        ])

        return res.json(nestedProject);
    } else {
        return res.json("Nothing was found");
    }
});

router.post('/:projectId/tasks', requireUser, async (req,res,next)=>{

    console.log("in POST /:projectId/tasks");

    const projectId = req.params.projectId;


    // find the project
    const project = await Project.findOne({"_id":`${projectId}`})

    if (project && userOnProject(project, req.user._id)) {

        const newTask = new Task (req.body);
        // console.log(newTask, "newTask")

        // TODO - check whether there is an assignee on the task and if so and the following are true, add this task to their list. a) user exists, b) user has this project on their list

        project.tasks.push(newTask);

        try {
            const savedProject = await project.save();

            const returnedTask = savedProject.tasks.id(newTask._id);

            // embed the project id into the task, for Ryder ;)
            const manipulatedTask = {
                ...returnedTask.toObject(),
                projectId: project._id
              };

            return res.json(manipulatedTask);
        } catch (error) {
            return res.json(error);
        }
    } else {
        return res.json("No project or save not permitted");
    }
})

router.patch('/:projectId/tasks/:taskId', requireUser, async (req,res,next)=>{

    console.log("in PATCH /:projectId/tasks/:taskId");

    const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    // console.log(taskId, "taskId");
    
    const project = await Project.findOne({"_id":`${projectId}`})
    console.log(project.tasks,"project tasks")
    const task = project.tasks.id(taskId);

    console.log(task, "task");

    if (project && userOnProject(project, req.user._id) && task) {
        console.log("HERE!");
        
        // the special version to be sent to the back end
        const updatedTask = {
            ...task.toObject(),
            projectId: project._id,
            ...req.body,
          };
        
        // updating the task with the body
        Object.assign(task, req.body)

        // saving the project, which will save the task
        await project.save();
        
        return res.json(updatedTask);

    } else {
        return res.json("No project or save not permitted");
    }
})

router.delete('/:projectId/tasks/:taskId', requireUser, async (req,res,next)=>{
    
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;

    const project = await Project.findOne({"_id":`${projectId}`})
    const task = project.tasks.id(taskId);

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
            console.log(user, "user post save");
        }

        // now we remove that task from the project
        const taskIndex = project.tasks.findIndex((t) => t._id.toString() === taskId);

        project.tasks.splice(taskIndex, 1);

        await project.save();

        return res.json({message: "Deletion complete"});
    } else {

        return res.json({message: "project or task not found or insufficient priveleges"});
    }


});

router.post('/', async (req,res,next) =>{
    //This is probably done
    const adminId = req.body.adminId;
    const newProject = new Project({
        title: req.body.title,
        description: req.body.description,
        adminId: req.body.adminId,
        collaborators: [req.body.adminId],
        tasks: [],
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });

    console.log(adminId,"adminId")
    const owner = await User.findOne({"_id":`${adminId}`})

    if(await newProject.save()){
        owner.projects.push(newProject)
        await owner.save();
        console.log(newProject._id,"Project _id")
        return res.json(newProject);
    }else{
        return res.json({message:"Error"})
    }
});

router.patch('/:projectId', requireUser, async (req,res,next) =>{
    //This is where new collaborators will probably go

    console.log("in PATCH /:projectId");

    const projectId = req.params.projectId

    // console.log(req.body, "REQUEST BOD")
    // console.log(req.body.project, "REQUEST PROJ")

    const project = await Project.findOne({"_id":`${projectId}`})

    // error handling
    if(!project) {
        return res.json({message:"Project Not Found"})
        // const err = new Error('Project Not Found');
        // err.statusCode = 404;
        // next(err);
    }

    if(!userOnProject(project, req.user._id)) {
        return res.json({message:"User not authorized to modify this project"})
        // const err = new Error('User not authorized to modify this project');
        // err.statusCode = 401;
        // next(err);
    }

    // if we make it through error handling, it's update time. First need to check whether we need to make collaborator updates

    // if there are collaborators, we need to compare incoming list to the outgoing list to see what removals need to be made from these users
    if (project.collaborators) {
        // get the prior collaborators as a sorted string of IDs
        const priorCollaborators = project.collaborators.map(c => (c.toString())).sort();

        const incomingCollaborators = req.body.collaborators.sort()

        console.log(priorCollaborators, "Prior");
        console.log(incomingCollaborators, "Incoming");

        // console.log(JSON.stringify(priorCollaborators) === JSON.stringify(incomingCollaborators), "Comparison");

        const sameCollaborators = stringifyCompare(priorCollaborators, incomingCollaborators);

        // console.log(differentCollaborators);

        if(!sameCollaborators) {
            const removedCollaborators = priorCollaborators.filter(c => !incomingCollaborators.includes(c));
            const addedCollaborators = incomingCollaborators.filter(c => !priorCollaborators.includes(c));

            console.log(removedCollaborators, "removedCollaborators");
            console.log(addedCollaborators, "addedCollaborators");

            const removeProjectIdsFromUsers = await User.updateMany({_id: {$in: removedCollaborators} }, { $pull: {projects: projectId}})

            const addProjectIdsToUsers = await User.updateMany({_id: {$in: addedCollaborators} }, { $push: {projects: projectId}})

            console.log(removeProjectIdsFromUsers, "results of removing the IDs");
            console.log(addProjectIdsToUsers, "results of removing the IDs");
        }
    }

    // const new

    // console.log(priorCollaborators);

    // const strongProj = projectParams(req.body.project);
    // console.log(strongProj, "Strong Proj");

    const updatedProject = await Project.findOneAndUpdate(
        { _id: projectId },
        { $set: req.body },
        { new: true }
    );
    
    if(updatedProject) {
        return res.json(updatedProject);
    } else {
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

    if(!project) {
        return res.json({message:"No project found"});
    }
    if(!userOnProject(project, req.user._id)) {
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
        return res.json({message: "Successful Delete"});
    } else {
        return res.json({message:"Issue with Delete"});
    }
});

module.exports = router;
