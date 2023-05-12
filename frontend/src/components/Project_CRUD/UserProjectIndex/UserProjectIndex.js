import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserProjectIndex.css';
import * as projectActions from '../../../store/project';
import { selectUser } from '../../../store/session';
import * as userActions from '../../../store/user';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import ProjectCreateModal from '../ProjectCreateForm/index'
import TableRow from '../../TableRow/TableRow';

function UserProjectIndex() {
  const dispatch = useDispatch();
  const allProjects = useSelector(projectActions.getProjects);
  const currentUser = useSelector(selectUser);
  const history = useHistory();
  useEffect(() => {

    // if (currentUser) dispatch(userActions.fetchUser(currentUser._id));
  }, [currentUser._id, dispatch]);

  const userProjects = allProjects.filter(
    (project) => project.adminId === currentUser._id
  );

  const handleClick = (e,project)=>{
    e.preventDefault();
    history.push(`/projects/${project._id}`)
  }

  function logIt(l) {
    console.log(l);
  }


  return (
    <div className="user-project-index" >
      <TableRow row={["Title", "Collaborators","Tasks"]} rowClass={"task-table-header"}/>
      {allProjects.map((p, ix) => {
        console.log(p, "this is the p")
        const collabCount = p.collaborators.length;
        const taskCount = p.tasks.length;
        return (
          <TableRow key={ix} handleClick={handleClick} rowElement={p} row={[p.title, collabCount, taskCount]}/>
        )
      })}


      {/* <h2>Your Projects</h2> */}
      {/* <ul>
        {allProjects.map((project) => (
          <li key={project._id} onClick={(e)=>{handleClick(e,project)}}>
            <h3>Project Title: {project.title}</h3>
            <p>Project Description: {project.description}</p>
            <p>
              Start Date: {project.startDate} <br/> End Date: {project.endDate}
            </p>
          </li>
        ))}
      </ul>
      <ProjectCreateModal /> */}
    </div>
  );
}

export default UserProjectIndex;
