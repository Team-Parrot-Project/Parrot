
import React, { useEffect } from 'react';
import ProjectCreateForm from '../Project_CRUD/ProjectCreateForm/ProjectCreateForm';
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
import UserProjectIndex from '../Project_CRUD/UserProjectIndex/UserProjectIndex';
import TaskRecommendation from '../UserHome/TaskRecommendation/TaskRecommendation';
import TaskCreateForm from '../Task_CRUD/TaskCreateForm/TaskCreateForm';

export default function TestPage () {

  return (
      <div className="testingComponents">
        <ProjectCreateModal/>
        <TaskCreateModal />
        <UserProjectIndex />
        <ProjectShow projectId="645c6a5c595bdfe7a1304e8c"/>
        <TaskShow taskId="645c6a5c595bdfe7a1304e8d"/>
        <ProjectDeleteModal/>
        <DeleteTask/>
        <ProjectUpdateModal projectId="645c6a5c595bdfe7a1304e8c"/>
        <TaskUpdateModal taskId="645c6a5c595bdfe7a1304e8d" projectId="645c6a5c595bdfe7a1304e8c"/>
        <TaskRecommendation title="Create a cookbook" description="The goal of this project is to create an international ccokbook." startDate="2023-08-15" endDate="2023-09-30" />
      </div>
  );
}
