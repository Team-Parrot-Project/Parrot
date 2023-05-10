import React from 'react';
import ProjectCreateModal from '../Project_CRUD/ProjectCreateForm';
import TaskCreateForm from '../Task_CRUD/TaskCreateForm/TaskCreateForm';
import ProjectShow from '../Project_CRUD/ProjectShow/ProjectShow';
import ProjectUpdateForm from '../Project_CRUD/ProjectUpdateForm/ProjectUpdateForm';
import TaskRecomendation from '../UserHome/TaskRecommendation/TaskRecommendation';
import ProjectDelete from '../Project_CRUD/ProjectDelete/ProjectDelete';
import TaskShow from '../Task_CRUD/TaskShow/TaskShow';
import TaskUpdateForm from '../Task_CRUD/TaskUpdateForm/TaskUpdateForm';

import './TestIndex.css';

export default function TestPage () {
  return (
      <div className="testingComponents">
        <ProjectCreateModal/>
        {/* <ProjectShow projectId="645b1d32fb7e41fd035603a9"/>
        <ProjectUpdateForm projectId="645b1d32fb7e41fd035603a9"/>
        <ProjectDelete/>
        <TaskCreateForm />
        <TaskRecomendation title="Productivity App" description="The goal of this project is to develop a producitivty web app utilizing a MERN stack" startDate="2023-05-09T00:00:00.000Z" endDate="2023-05-10T00:00:00.000Z" />
        <TaskShow taskId="645bd51881ad6e27a7da1e9c"/>
        <TaskUpdateForm taskId="645bd51881ad6e27a7da1e9c"/> */}
      </div>
  );
}
