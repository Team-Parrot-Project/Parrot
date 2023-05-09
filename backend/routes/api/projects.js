var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const User = mongoose.model('User');
const { isProduction } = require('../../config/keys');
const { requireUser } = require('../../config/passport');
const { userOnProject } = require('../../config/util');

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

    // return res.json(allP);

    if (project && userOnProject(project, req.user._id)) {
        // need to make sure the currently logged in user is either a collaborator or an admin of the project
        return res.json(project);
    } else {
        return res.json("Nothing was found");
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
        console.log(owner.projects,"owner projects")
        owner.projects.push(newProject)
        await owner.save();
        console.log(owner.projects,"owner projects")
        return res.json(newProject);
    }else{
        return res.json({message:"Error"})
    }
});

router.patch('/:projectid', async (req,res,next) =>{
    //This is where new collaborators will probably go
    const projectId = req.params.projectid
    const newProject = await Project.updateOne({"_id":`${projectId}`},
    {$set:{
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    }})
    if(await newProject.save()){   
        return res.json(newProject)
    }else {
        return res
    }
});

router.delete('/:projectid', async (req,res,next) =>{
    //Probably has to somehow DeleteMany Collaborators or iterate somehow
    const projectId = req.params.projectid
    const newProject = await Project.findOne({"_id":`${projectId}`})
    if(await Project.deleteOne({"_id":`${projectId}`})){ 
        
        return res.json({message:"Deleted Project"})
    }else {
        return res.json({message:"Issue with Delete"})
    }
});

module.exports = router;
