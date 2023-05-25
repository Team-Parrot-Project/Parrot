const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
// const Task = require('../models/Task');
const {Project, Task} = require('../models/Project.js');
const Notification = require('../models/Notification.js');
// const Project = require('../models/Project');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const { getFutureDate } = require("../config/util.js");

  const deleteData = async () => {
    console.log("DB Dropping initiated")
    await User.deleteMany({});
    // await Task.deleteMany({});
    await Project.deleteMany({});
    await Notification.deleteMany({});
    console.log('Data deleted!');
  };

const seedDB = async () => {
  try {
    console.log("DB seeding initiated")

    const todaysDate = new Date()
  
    // Create users
    userOne = new User({
        email: 'admin@example.com',
        username: 'admin',
        hashedPassword: await bcrypt.hash('password', 10),
        projects: [],
        assignedTasks: []
    });

    userTwo = new User({
        email: "ryde@or-die.com",
        username: "Ryder",
        hashedPassword: await bcrypt.hash('password', 10),
        projects: [],
        assignedTasks: []
    })

    userThree = new User({
        email: "birds@theword.com",
        username: "Bird",
        hashedPassword: await bcrypt.hash('password', 10),
        projects: [],
        assignedTasks: []
    })
    console.log("Users created in memory")

    mainProject = new Project ({
        title: "Feel the MERN",
        description: "a quest to learn a stack and build a project on it",
        adminId: userOne,
        collaborators: [userOne, userTwo, userThree],
        tasks: [
            {
                title: "Design",
                description: "write the design",
                priority: 'medium',
                assignee: userTwo,
                status: "in progress",
                startDate: getFutureDate(0),
                endDate: getFutureDate(7),
                progress: 50,
                blockingTasks: []
            },
            {
                title: "Whiteboard",
                description: "commit design to drawings",
                priority: 'medium',
                assignee: userThree,
                status: "in progress",
                startDate: getFutureDate(7),
                endDate: getFutureDate(14),
                progress: 50,
                blockingTasks: []
              },
              {
                title: "Code the back end",
                description: "Bird and Ryder, you're up",
                priority: 'medium',
                assignee: userThree,
                status: "in progress",
                startDate: getFutureDate(14),
                endDate: getFutureDate(21),
                progress: 50,
                blockingTasks: []
              },
              {
                title: "Prettify the site",
                description: "we got the team from Neighborhood Node....nuff said",
                priority: 'medium',
                assignee: userOne,
                status: "in progress",
                startDate: getFutureDate(21),
                endDate: getFutureDate(28),
                progress: 50,
                blockingTasks: []
              },
              {
                title: "Present the App",
                description: "Rodman, you're up!",
                priority: 'medium',
                assignee: userOne,
                status: "in progress",
                startDate: getFutureDate(28),
                endDate: getFutureDate(35),
                progress: 50,
                blockingTasks: []
              }

        ],
        startDate: getFutureDate(0),
        endDate: getFutureDate(35)
    })

    
    userOne.projects.push(mainProject);
    userTwo.projects.push(mainProject);
    userThree.projects.push(mainProject);

    userTwo.assignedTasks.push(mainProject.tasks[0]);
    userThree.assignedTasks.push(mainProject.tasks[1]);
    userThree.assignedTasks.push(mainProject.tasks[2]);
    userOne.assignedTasks.push(mainProject.tasks[3]);
    userOne.assignedTasks.push(mainProject.tasks[4]);

    mainProject.tasks[1].blockingTasks.push(mainProject.tasks[0])
    mainProject.tasks[2].blockingTasks.push(mainProject.tasks[1])
    mainProject.tasks[3].blockingTasks.push(mainProject.tasks[2])
    mainProject.tasks[4].blockingTasks.push(mainProject.tasks[3])

    secondaryProject = new Project ({
        title: "Rails Olympics",
        description: "enter into and dominate rails Olympics",
        adminId: userOne,
        collaborators: [userOne, userTwo],
        tasks: [
          {
            title: "Read",
            description: "AAO is your best friend",
            priority: 'medium',
            assignee: userOne,
            status: "in progress",
            startDate: getFutureDate(0),
            endDate: getFutureDate(3),
            progress: 50,
            blockingTasks: []
        },
        {
          title: "Practice",
          description: "aren't you glad Darren recorded these sessions?",
          priority: 'medium',
          assignee: userOne,
          status: "in progress",
          startDate: getFutureDate(3),
          endDate: getFutureDate(6),
          progress: 50,
          blockingTasks: []
      },
      {
        title: "Compete",
        description: "SPIRE, CRRLLL",
        priority: 'medium',
        assignee: userOne,
        status: "in progress",
        startDate: getFutureDate(6),
        endDate: getFutureDate(9),
        progress: 50,
        blockingTasks: []
    }
        ],
        startDate: getFutureDate(0),
        endDate: getFutureDate(9)
    })

    userOne.projects.push(secondaryProject);
    userOne.assignedTasks.push(secondaryProject.tasks[0]);
    userOne.assignedTasks.push(secondaryProject.tasks[1]);
    userOne.assignedTasks.push(secondaryProject.tasks[2]);

    userTwo.projects.push(secondaryProject);

    thirdProject = new Project ({
      title: "Kahoot",
      description: "enter into and dominate rails Olympics",
      adminId: userOne,
      collaborators: [userOne],
      tasks: [
        {
          title: "Login",
          description: "get the code",
          priority: 'medium',
          assignee: userOne,
          status: "in progress",
          startDate: getFutureDate(0),
          endDate: getFutureDate(5),
          progress: 50,
          blockingTasks: []
      },
      {
        title: "Listen to lit music",
        description: "tell the instrutor to turn it up?",
        priority: 'medium',
        assignee: userOne,
        status: "in progress",
        startDate: getFutureDate(5),
        endDate: getFutureDate(10),
        progress: 50,
        blockingTasks: []
    },
    {
      title: "Compete",
      description: "don't answer too fast!",
      priority: 'medium',
      assignee: userOne,
      status: "in progress",
      startDate: getFutureDate(10),
      endDate: getFutureDate(15),
      progress: 50,
      blockingTasks: []
  }
      ],
      startDate: getFutureDate(0),
      endDate: getFutureDate(15)
  })

  userOne.projects.push(thirdProject);
  userOne.assignedTasks.push(thirdProject.tasks[0]);
  userOne.assignedTasks.push(thirdProject.tasks[1]);
  userOne.assignedTasks.push(thirdProject.tasks[2]);

    await User.insertMany([userOne, userTwo, userThree]);
    const projectResult = await Project.insertMany([mainProject, secondaryProject, thirdProject]);
    console.log(projectResult, "projectResult");
    console.log(projectResult[0].tasks[1], "second task");

    // projectOne = projectResult[]

    console.log('Database seeded!');

  } catch (err) {
    console.log(err);
  } finally {
    mongoose.disconnect();
  }
};

mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log('MongoDB connected...'))
.then(() => deleteData())
.then(() => seedDB())
.catch(err => console.log(err));