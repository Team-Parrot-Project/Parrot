var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const User = mongoose.model('User');
const { isProduction } = require('../../config/keys');
const { requireUser } = require('../../config/passport');
const { userOnProject, projectParams } = require('../../config/util');
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
    console.log("HERE I AM");

    const projectId = req.params.projectId;

    console.log(projectId, "PID");
    // find the project

    const project = await Project.findOne({"_id":`${projectId}`})
    // console.log(project, "This is the project")

    if (project && userOnProject(project, req.user._id)) {

        const newTask = new Task (req.body.task);
        console.log(newTask, "newTask")

        project.tasks.push(newTask);

        try {
            const savedProject = await project.save();
            console.log(savedProject, "savedProject")
            return res.json(savedProject);
        } catch (error) {
            return res.json(error);
        }
    } else {
        return res.json("No project or save not permitted");
    }
})

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

    // console.log(req.params, "PARAMS");

    const projectId = req.params.projectId

    // console.log(req.body, "REQUEST BOD")
    // console.log(req.body.project, "REQUEST PROJ")

    const project = await Project.findOne({"_id":`${projectId}`})

    if (project && userOnProject(project, req.user._id)) {
        // const strongProj = projectParams(req.body.project);
        // console.log(strongProj, "Strong Proj");

        const updatedProject = await Project.findOneAndUpdate(
            { _id: projectId },
            { $set: req.body },
            { new: true }
        );
        
        return res.json(updatedProject);
    } else {
        return res.json({message:"Error"})
    }
});


router.delete('/:projectId', requireUser, async (req,res,next) =>{
    //Probably has to somehow DeleteMany Collaborators or iterate somehow
    const projectId = req.params.projectId;

    const project = await Project.findOne({"_id":`${projectId}`});
    console.log(project, "PROJECT!!");
    console.log("HERE I AM!!");
    console.log(req.user._id, "loged in as")

    if (project && userOnProject(project, req.user._id)) {
        console.log("There I AM!!");
        const deleteResult = await Project.deleteOne({"_id":`${projectId}`});
        console.log(deleteResult.ok, "DELETE OK");
        console.log(deleteResult, "DELETE Result");
        if(deleteResult.deletedCount === 1) {
            return res.json({message: "Successful Delete"});
        } else {
            return res.json({message:"Issue with Delete"});
        }
    }
    {
        return res.json({message:"Not found or permitted"});
    }
});

module.exports = router;
