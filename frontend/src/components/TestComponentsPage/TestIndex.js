import React from 'react';
import ProjectCreateModal from '../Project_CRUD/ProjectCreateForm';
import TaskCreateModal from '../Task_CRUD/TaskCreateForm/index';
import ProjectShow from '../Project_CRUD/ProjectShow/ProjectShow';
import ProjectUpdateModal from '../Project_CRUD/ProjectUpdateForm/index';
import TaskRecomendation from '../UserHome/TaskRecommendation/TaskRecommendation';
import ProjectDeleteModal from '../Project_CRUD/ProjectDelete/ProjectDeleteModal';
import TaskShow from '../Task_CRUD/TaskShow/TaskShow';
import TaskUpdateModal from '../Task_CRUD/TaskUpdateForm/index';
import DeleteTask from '../Task_CRUD/TaskDelete/TaskDelete';

import './TestIndex.css';

export default function TestPage () {
  return (
      <div className="testingComponents">
        <ProjectCreateModal/>
        <TaskCreateModal projectId="645c0ae85a55a470b69c5ba3"/>
        <ProjectShow projectId="645c0ae85a55a470b69c5ba3"/>
        <TaskShow taskId="645c0cc55a55a470b69c5bcb"/>
        <ProjectDeleteModal/>
        <DeleteTask/>
        <ProjectUpdateModal projectId="645c0ae85a55a470b69c5ba3"/>
        <TaskUpdateModal taskId="645c0cc55a55a470b69c5bcb"/>
        <TaskRecomendation title="Productivity App" description="The goal of this project is to develop a producitivty web app utilizing a MERN stack" startDate="2023-05-09T00:00:00.000Z" endDate="2023-05-10T00:00:00.000Z" />
      </div>
  );
}
