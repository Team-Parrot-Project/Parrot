<div style="display: flex; justify-content: center;">
  <a href="https://parrot.herokuapp.com/" style="text-align: center;">
    <img src="./frontend/src/assets/logo_text_version.png" alt="Parrot PM">
  </a>
</div>


# Parrot Project Management

Parrot is a collaborative project management suite founded by a team of four individuals. It empowers teams to effectively ideate, develop, and execute complex projects by utilizing AI-generated project plans, interactive data visualizations, and automated reporting. The inclusion of Gantt charts within Parrot facilitates seamless project scheduling, resource allocation, progress tracking, and communication among team members.

-----------------

## Founders
<!-- HTML STARTS HERE -->
<div style="display: flex;">
  <!-- First team member -->
  <div style="display: flex; flex-direction: column; align-items: center; margin-right: 20px;">
    <p>Christopher Banas</p>
    <div style="display: flex; justify-content: center;">
      <a href="https://github.com/chrisbanas">
        <img src="./frontend/src/assets/github.png" alt="Github logo" style="width: 30px; height: 30px; margin-right: 5px;" />
      </a>
      <a href="https://www.linkedin.com/in/christopher-banas/">
        <img src="./frontend/src/assets/linkedin.png" alt="LinkedIn logo" style="width: 30px; height: 30px; margin-right: 5px;" />
      </a>
    </div>
  </div>

  <!-- Second team member -->
  <div style="display: flex; flex-direction: column; align-items: center; margin-right: 20px;">
    <p>Michael Bird</p>
    <div style="display: flex; justify-content: center;">
      <a href="https://github.com/apporator">
        <img src="./frontend/src/assets/github.png" alt="Github logo" style="width: 30px; height: 30px; margin-right: 5px;" />
      </a>
      <a href="https://www.linkedin.com/in/mibird/">
        <img src="./frontend/src/assets/linkedin.png" alt="LinkedIn logo" style="width: 30px; height: 30px; margin-right: 5px;" />
      </a>
    </div>
  </div>

  <!-- Third team member -->
  <div style="display: flex; flex-direction: column; align-items: center; margin-right: 20px;">
    <p>Roderick Mendoza</p>
    <div style="display: flex; justify-content: center;">
      <a href="https://github.com/rodmen07">
        <img src="./frontend/src/assets/github.png" alt="Github logo" style="width: 30px; height: 30px; margin-right: 5px;" />
      </a>
      <a href="https://www.linkedin.com/in/roderick-mendoza-9133b7b5/">
        <img src="./frontend/src/assets/linkedin.png" alt="LinkedIn logo" style="width: 30px; height: 30px; margin-right: 5px;" />
      </a>
    </div>
  </div>

  <!-- Fourth team member -->
  <div style="display: flex; flex-direction: column; align-items: center;">
    <p>Ryder Aguilera</p>
    <div style="display: flex; justify-content: center;">
      <a href="https://github.com/Ryderagui">
        <img src="./frontend/src/assets/github.png" alt="Github logo" style="width: 30px; height: 30px; margin-right: 5px;" />
      </a>
      <a href="https://www.linkedin.com/in/raguilera994/">
        <img src="./frontend/src/assets/linkedin.png" alt="LinkedIn logo" style="width: 30px; height: 30px; margin-right: 5px;" />
      </a>
    </div>
  </div>

</div>
<!-- HTML ENDS HERE -->


-----------------

## Technologies

### User Auth

For user authentication, Parrot utilizes [JWT](https://jwt.io/) (JSON Web Token) authentication with the help of essential dependencies. We leverage the [passport](https://www.passportjs.org/) library, utilizing the LocalStrategy for authentication. User passwords are securely hashed using [bcryptjs](https://www.npmjs.com/package/bcryptjs), and the User model from [mongoose](https://mongoosejs.com/) is employed to interact with the database and manage user authentication processes. This setup ensures a secure and reliable authentication system for our application.

### Front End

Our frontend is built on the [Node.js](https://nodejs.org/en/about) runtime environment and utilizes [Webpack](https://webpack.js.org/) for module bundling, along with [React](https://react.dev/) and [Redux](https://redux.js.org/) for building a dynamic and interactive user interface.

### Back End
Our backend is built on the combination of [MongoDB](https://www.mongodb.com/) and [Express.js](https://expressjs.com/). MongoDB, a NoSQL database, allows for flexible and scalable data storage, while Express.js provides a streamlined and efficient framework for building web applications. With this stack, we leverage the benefits of a versatile database and a lightweight yet feature-rich backend framework, enabling us to develop a highly performant and scalable backend system for our project.

### Hosting / Domain

* Heroku
* Redis
* Google Domains

## UX / UI Design

-----------------

## Features


-----------------

## OpenAi

Parrot integrates [OpenAI's API](https://openai.com/product) and utilizes Chat GPT to automate task generation based on the project's name and description. By leveraging the capabilities of Chat GPT, accurate and relevant tasks are automatically generated, providing teams with an efficient and streamlined workflow. Experience the power of artificial intelligence in project management by leveraging our innovative solution.

## Gantt Chart

A Gantt chart is a visual representation of a project schedule that displays tasks as horizontal bars on a timeline. It illustrates the start and end dates of each task, dependencies between tasks, and overall project progress. In project management apps, Gantt charts provide an efficient way to plan, track, and communicate project timelines, helping teams visualize the project's timeline, allocate resources, identify bottlenecks, and monitor progress towards completion.

We Implemented an intuitive user experience for the Gantt chart visualization in Parrot by leveraging the capabilities of npm packages such as [moment](https://momentjs.com/) for time manipulation, [snapsvg](http://snapsvg.io/) for interactive SVG rendering, [frappe-gantt](https://frappe.io/) for Gantt chart functionality, and [sass](https://sass-lang.com/) for seamless and maintainable styling.

## Websocket Live Notifications

This MERN stack project showcases the seamless integration of websockets to enable live notifications for project and task CRUD operations. By utilizing websockets, users receive real-time notifications whenever a project or task is created, updated, or deleted. This dynamic feature enhances collaboration and keeps team members informed about the latest changes, ensuring a synchronized and efficient project management experience.

-----------------

## Wiki

Want to take a deeper dive into this project? Check the articles from the [wiki](https://github.com/Team-Parrot-Project/Parrot/wiki).


-----------------
© Parrot
