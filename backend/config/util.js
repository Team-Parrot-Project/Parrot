
// 
function userOnProject(project, userId) {
    console.log(userId, "this is userid in uop");
    console.log(project.adminId, "this is adminid in uop");
    console.log(project.adminId === userId, "EQUAL?");
    // if the user is the admin of the project immediately return true
    if(project.adminId == userId) {
        console.log("they are the admin");
        return true;
    } 
    else if (project.collaborators.indexOf(userId) >= 0) {
        console.log("they are a collab");
        return true;
    } else {
        console.log("not authorized");
        return false;
    }

}

function projectParams (project) {

    const keys = Object.keys(project);
    const strongProj = {};
    const permitted = [
        "title",
        "description",
        "adminId",
        "collaborators",
        "tasks",
        "startDate",
        "endDate"
    ]

    keys.forEach((k) => {
        if(permitted.indexOf(k) >= 0) {
            strongProj[k] = project.k
        }
    })

    return strongProj;
}

module.exports = {
    userOnProject,
    projectParams
}