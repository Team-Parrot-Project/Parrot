const { ChatCompletionResponseMessageRoleEnum } = require("openai");
const { Task } = require("../models/Project");

// TODO need to make the admin check work here and likely break out a separate admin only check. Currently any collaborator has full CRUD access to their projects
function userOnProject(project, userId) {

    console.log("checking modification permissions for user with userOnProject");

    // if the user is the admin of the project immediately return true
    if(project.adminId.toString() == userId) {
        console.log("they are the admin");
        return true;
    } 
    else if (project.collaborators.indexOf(userId) >= 0) {
        console.log("they are a collaborator");
        return true;
    } else {
        console.log("not authorized");
        return false;
    }

}

const validTaskParams = [
    "title",
    "description",
    "priority",
    "assignee",
    "status",
    "startDate",
    "blockingTasks"
]

function projectParams (project) {

    // const keys = Object.keys(project);
    // const strongProj = {};
    // const permitted = [
    //     "title",
    //     "description",
    //     "adminId",
    //     "collaborators",
    //     "tasks",
    //     "startDate",param {
    //         existingTask[param] =   "startDate",para
    //     }
    //     "endDate"
    // ]

    // keys.forEach((k) => {
    //     if(permitted.indexOf(k) >= 0) {
    //         strongProj[k] = project.k
    //     }
    // })

    // return strongProj;
}

function taskProtector(taskUpdates, existingTask) {

    validTaskParams.forEach((param) => {
        if(taskUpdates[param]) {
            existingTask[param] = taskUpdates[param]
        }
    })

    return existingTask;
}

module.exports = {
    userOnProject,
    projectParams,
    taskProtector
}