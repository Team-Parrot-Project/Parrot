import React from 'react';
import ProjectCreateForm from '../Project_CRUD/ProjectCreateForm/ProjectCreateForm';
import TaskCreateForm from '../Task_CRUD/TaskCreateForm/TaskCreateForm';
import ProjectShow from '../Project_CRUD/ProjectShow/ProjectShow';
import ProjectUpdateForm from '../Project_CRUD/ProjectUpdateForm/ProjectUpdateForm';

export default function TestPage () {

    return (
        <div className="testingComponents">
          {/* <ProjectCreateForm />
          <TaskCreateForm />
          <ProjectShow projectId="645a748b33dbf64bdcb0e658"/> */}
          <ProjectCreateForm/>
          <ProjectUpdateForm projectId="645ad919bbe159ae2fcb7f7b"/>
        </div>
    );
}
