//install socket.io on backend
//const io = require socket.io(5000)
//Add CORS protection
//io.on('connection',socket =>{})

//install socket.io-client
//connect to server 
// socket.broadcaster.emit("string", messagel)


// General Plan - We three namespaces for 3 channels-
// Project Owners- /admin/:id
// Project Collaborators - /projects/:id
// Task Assginees- /tasks/:id7

// Two channels- User Channel, Project Channel
// Changes to a project broadcast to the project and to the admin's User Channel
// Changes to tasks are only to that user channel and the admin's user channel
