
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

export default function TestPage () {

  return (
      <div className="testingComponents">
        <ProjectCreateModal/>
        <TaskCreateModal />
        <ProjectShow projectId="645c0ae85a55a470b69c5ba3"/>
        <TaskShow taskId="645c0cc55a55a470b69c5bcb"/>
        <ProjectDeleteModal/>
        <DeleteTask/>
        <ProjectUpdateModal projectId="645c0ae85a55a470b69c5ba3"/>
        <TaskUpdateModal taskId="645c0cc55a55a470b69c5bcb" projectId="645c0ae85a55a470b69c5ba3"/>
      </div>
  );
}
