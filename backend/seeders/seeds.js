const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
// const Task = require('../models/Task');
const {Project, Task} = require('../models/Project.js');
// const Project = require('../models/Project');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');


  // sdkfjas

  mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const seedDB = async () => {
  try {
    // Create users
    const users = [];

    const hashedPassword = await bcrypt.hash('password', 10);

    users.push(
      new User({
        email: 'admin@example.com',
        username: 'admin',
        hashedPassword
      })
    );

    for (let i = 1; i <= 10; i++) {
      const email = faker.internet.email();
      const username = faker.internet.userName();
      const hashedPassword = await bcrypt.hash('password', 10);

      users.push(
        new User({
          email,
          username,
          hashedPassword
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
      const assignee = savedUsers[Math.floor(Math.random() * 10)]._id;
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

    for (let i = 1; i <= 5; i++) {
      const title = faker.company.catchPhrase();
      const description = faker.lorem.sentences();
      const adminId = savedUsers[0]._id;
      const collaborator = savedUsers[Math.floor(Math.random() * 10)]._id;
      const projectTasks = savedTasks.slice((i - 1) * 10, i * 10);
      const startDate = faker.date.past();
      const endDate = faker.date.future();

      projects.push(
        new Project({
          title,
          description,
          adminId,
          collaborators: [collaborator],
          tasks: projectTasks,
          startDate,
          endDate
        })
      );
    }

    // Save projects to database
    await Project.insertMany(projects);

    console.log('Database seeded!');
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.disconnect();
  }
};

seedDB();