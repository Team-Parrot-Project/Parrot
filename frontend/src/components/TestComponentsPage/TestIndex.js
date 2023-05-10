import React from 'react';
import ProjectCreateForm from '../Project_CRUD/ProjectCreateForm/ProjectCreateForm';
import TaskCreateForm from '../Task_CRUD/TaskCreateForm/TaskCreateForm';
import ProjectShow from '../Project_CRUD/ProjectShow/ProjectShow';
import ProjectUpdateForm from '../Project_CRUD/ProjectUpdateForm/ProjectUpdateForm';
import TaskRecomendation from '../UserHome/TaskRecommendation/TaskRecommendation';

export default function TestPage () {

    return (
        <div className="testingComponents">
          <ProjectCreateForm />
          <TaskCreateForm />
          {/* <ProjectShow projectId="645ade1ded67fa0cdd3cb806"/> */}
          <ProjectUpdateForm projectId="645ade1ded67fa0cdd3cb806"/>
          <TaskRecomendation title="Productivity App" description="The goal of this project is to develop a producitivty web app utilizing a MERN stack" startDate="2023-05-09T00:00:00.000Z" endDate="2023-05-10T00:00:00.000Z" />
        </div>
    );
}
