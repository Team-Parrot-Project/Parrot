var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const { isProduction } = require('../../config/keys');


router.get('/:projectid', async (req,res,next)=>{
    const projectId = req.params.projectid
    const project = await Project.findOne({id:projectId})
    return res.json(project)
});

router.post('/', async (req,res,next) =>{
    const newProject = new Project({
        title: req.body.title,
        description: req.body.description,
        adminId: req.body.adminId,
        collaborators: [req.body.adminId],
        tasks: [],
        startDate: req.body.startDate,
        endDate: req.body.endDate
    })
    return res.json(newProject)
});

module.exports = router;
