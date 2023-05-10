
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
import { useDispatch, useSelector } from 'react-redux';
import * as projectActions from '../../store/project';
import * as taskActions from '../../store/task';

export default function TestPage () {
  const dispatch = useDispatch();
  const projectId = "645be7f3ade7c64863edf125";
  const tasks = useSelector(taskActions.getTasks)
  useEffect(()=>{
      dispatch(projectActions.fetchProject(projectId))
  },[dispatch,projectId]);

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
        {/* <ProjectShow projectId="645b1d32fb7e41fd035603a9"/>
        <ProjectUpdateForm projectId="645b1d32fb7e41fd035603a9"/>
        <ProjectDelete projectId="645be446ade7c64863edf102"/>
        <TaskCreateForm />
        <TaskRecomendation title="Productivity App" description="The goal of this project is to develop a producitivty web app utilizing a MERN stack" startDate="2023-05-09T00:00:00.000Z" endDate="2023-05-10T00:00:00.000Z" />

        <div>
        {tasks.map((task)=>{
          return <div>
            <TaskShow taskId={`${task._id}`}/>
            </div>
        })}

        </div>
      <TaskUpdateForm taskId="645be8acade7c64863edf160" projectId="645be7f3ade7c64863edf125"/>*/}
      </div>
  );
}
