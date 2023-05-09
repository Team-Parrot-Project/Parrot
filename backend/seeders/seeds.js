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
    await Task.deleteMany({});
    await Project.deleteMany({});
    console.log('Data deleted!');
  };

const seedDB = async () => {
  try {
    console.log("DB seeding initiated")
    // Create users
    const users = [];

    const hashedPassword = await bcrypt.hash('password', 10);

    users.push(
      new User({
        email: 'admin@example.com',
        username: 'admin',
        hashedPassword,
        projects: [],
        assignedTasks: []
      })
    );

    for (let i = 1; i <= 5; i++) {
      const email = faker.internet.email();
      const username = faker.internet.userName();
      const hashedPassword = await bcrypt.hash('password', 10);

      users.push(
        new User({
          email,
          username,
          hashedPassword,
          projects: [],
          assignedTasks: []
        })
      );
    }

    // Save users to database
    const savedUsers = await User.insertMany(users);

    // Create tasks
    const tasks = [];

    for (let i = 1; i <= 50; i++) {
      const title = faker.lorem.words();
      const description = faker.lorem.paragraph();
      const priority = "medium";
      const assignee = savedUsers[Math.floor(Math.random() * 5)]._id;
      const status = "in progress";
      const startDate = faker.date.past();
      const endDate = faker.date.future();
      const blockingTasks = [];

      tasks.push(
        new Task({
          title,
          description,
          priority,
          assignee,
          status,
          startDate,
          endDate,
          blockingTasks
        })
      );
    }

    // Save tasks to database
    const savedTasks = await Task.insertMany(tasks);

    // Create projects
    const projects = [];

    // const uniqueUsersToUpdate = new Set();

    for (let i = 0; i <= 4; i++) {

      // this will dictate the owner vs collaborator of the task
      let j = i % 2;
      console.log(j, "J!");

      const title = faker.company.catchPhrase();
      const description = faker.lorem.sentences();

      // make the admin the owner of all the projects
      const adminId = savedUsers[j]._id;

      // make the admin a collaborator along with the next two users
      const collaborators = [savedUsers[j]._id,savedUsers[j+1]._id,savedUsers[j+2]._id]
      
      const projectTasks = savedTasks.slice((i - 1) * 10, i * 10);
      const startDate = faker.date.past();
      const endDate = faker.date.future();

      const newProj = new Project({
        title,
        description,
        adminId,
        collaborators,
        tasks: projectTasks,
        startDate,
        endDate
      })

      projects.push(newProj);
    }

    // Save projects to database
    const savedProjects = await Project.insertMany(projects);

    savedProjects.forEach((pro, ix) => {
      savedUsers[0].projects.push(pro)
      savedUsers[1].projects.push(pro)
      savedUsers[2].projects.push(pro)
      savedUsers[3].projects.push(pro)
    })

    await savedUsers[0].save();
    await savedUsers[1].save();
    await savedUsers[2].save();
    await savedUsers[3].save();

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