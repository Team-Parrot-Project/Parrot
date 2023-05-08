
// User
const Users = {
    _id: ObjectId("5d8d5b50a5b9d4a3c402f571"),
    email: "josh@gmail.com",
    password_digest: "mK9jd37n",
    name: "Josh Smith",
    projects: [
        {ProjectObject1},
        {ProjectObject1}
    ],
    assignedTasks: [
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
    adminId: UserId("4a1h3m42a5b9d4i9dc405l721"),
    collaborators: [
        UserId1,
        UserId2,
        UserId3
    ],
    tasks: [
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
    assignee: userId1,
    status: "incomplete",
    startDate: 2015-01-01,
    endDate: 2017-01-01,
    blockingTasts: [
        TaskId1,
        TaskId2,
        TaskId3
    ]
}