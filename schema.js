// User
const Users = {
    _id: ObjectId("5d8d5b50a5b9d4a3c402f571"),
    email: "josh@gmail.com",
    password_digest: "mK9jd37n",
    username: "Josh Smith",
    projects: [ //any project they are an owner or collaborator of
        ProjectId1,
        ProjectId2
    ],
    assignedTasks: [ //only tasks assigned to the user
        TaskId1,
        TaskId2,
        TaskId3
    ]
}

// Project
const Projects = {
    _id: ObjectId("5d8d5b50a5b9d4a3c402f571"),
    title: "Mern Baby Mern",
    description: "get it done",
    adminId: UserId1,
    collaborators: [ //everyone invited to the project
        UserId1,
        UserId2,
        UserId3
    ],
    tasks: [ //all the tasks of the projects
        {TaskObject1},
        {TaskObject2},
        {TaskObject3}
    ],
    startDate: 2015-01-01,
    endDate: 2017-01-01
}

const Tasks = {
    _id: ObjectId("5d8d5b50a5b9d4a3c402f571"),
    title: "Lay the foundation",
    description: "This is my task!",
    priority: "high",
    assignee: UserId1,
    status: "incomplete",
    startDate: 2015-01-01,
    endDate: 2017-01-01,
    blockingTasks: [ //leave empty for now, this is a nice to have
        TaskId1,
        TaskId2,
        TaskId3
    ]
}