const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
// const Task = require('../models/Task');
const {Project, Task} = require('../models/Project.js');
// const Project = require('../models/Project');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');


  // sdkfjas

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
    // Create users
    userOne = new User({
        email: 'admin@example.com',
        username: 'admin',
        hashedPassword: await bcrypt.hash('password', 10),
        projects: [],
        assignedTasks: []
    });

    userTwo = new User({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        hashedPassword: await bcrypt.hash('password', 10),
        projects: [],
        assignedTasks: []
    })

    userThree = new User({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        hashedPassword: await bcrypt.hash('password', 10),
        projects: [],
        assignedTasks: []
    })
    console.log("Users created in memory")

    mainProject = new Project ({
        title: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        adminId: userOne,
        collaborators: [userOne, userTwo, userThree],
        tasks: [
            {
                title: faker.lorem.words(),
                description: faker.lorem.paragraph(),
                priority: 'medium',
                assignee: userTwo,
                status: "in progress",
                startDate: faker.date.past(),
                endDate: faker.date.future(),
                blockingTasks: []
            },
            {
                title: faker.lorem.words(),
                description: faker.lorem.paragraph(),
                priority: 'medium',
                assignee: userThree,
                status: "in progress",
                startDate: faker.date.past(),
                endDate: faker.date.future(),
                blockingTasks: []
              },
              {
                title: faker.lorem.words(),
                description: faker.lorem.paragraph(),
                priority: 'medium',
                assignee: userThree,
                status: "in progress",
                startDate: faker.date.past(),
                endDate: faker.date.future(),
                blockingTasks: []
              },
              {
                title: faker.lorem.words(),
                description: faker.lorem.paragraph(),
                priority: 'medium',
                assignee: userOne,
                status: "in progress",
                startDate: faker.date.past(),
                endDate: faker.date.future(),
                blockingTasks: []
              },
              {
                title: faker.lorem.words(),
                description: faker.lorem.paragraph(),
                priority: 'medium',
                assignee: userOne,
                status: "in progress",
                startDate: faker.date.past(),
                endDate: faker.date.future(),
                blockingTasks: []
              }

        ],
        startDate: faker.date.past(),
        endDate: faker.date.future()
    })

    
    userOne.projects.push(mainProject);
    userTwo.projects.push(mainProject);
    userThree.projects.push(mainProject);

    userTwo.assignedTasks.push(mainProject.tasks[0]);
    userThree.assignedTasks.push(mainProject.tasks[1]);
    userThree.assignedTasks.push(mainProject.tasks[2]);
    userOne.assignedTasks.push(mainProject.tasks[3]);
    userOne.assignedTasks.push(mainProject.tasks[4]);

    mainProject.tasks[2].blockingTasks.push(mainProject.tasks[3]);
    mainProject.tasks[2].blockingTasks.push(mainProject.tasks[4]);

    secondaryProject = new Project ({
        title: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        adminId: userOne,
        collaborators: [userOne],
        tasks: [],
        startDate: faker.date.past(),
        endDate: faker.date.future()
    })

    userOne.projects.push(secondaryProject);

    await User.insertMany([userOne, userTwo, userThree]);
    await Project.insertMany([mainProject, secondaryProject]);

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