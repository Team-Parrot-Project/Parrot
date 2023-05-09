var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const User = mongoose.model('User');
const { isProduction } = require('../../config/keys');


router.get('/:projectid', async (req,res,next)=>{
    const projectId = req.params.projectid
    console.log(projectId)
    const project = await Project.findOne({"_id":`${projectId}`})
    console.log(project);
    return res.json(project)
});

router.post('/', async (req,res,next) =>{
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
    const projectId = req.params.projectid
    const project = Project.findOne()
    // const newProject = new Project({
    //     title: req.body.title,
    //     description: req.body.description,
    //     adminId: req.body.adminId,
    //     collaborators: [req.body.adminId],
    //     tasks: [],
    //     startDate: req.body.startDate,
    //     endDate: req.body.endDate
    // })
    return res.json(newProject)
});

module.exports = router;
