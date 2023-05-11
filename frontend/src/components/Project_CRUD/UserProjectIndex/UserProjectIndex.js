import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserProjectIndex.css';
import * as projectActions from '../../../store/project';
import { selectUser } from '../../../store/session';
import * as userActions from '../../../store/user';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function UserProjectIndex() {
  const dispatch = useDispatch();
  const allProjects = useSelector(projectActions.getProjects);
  const currentUser = useSelector(selectUser);
  const history = useHistory();
  useEffect(() => {

    if (currentUser) dispatch(userActions.fetchUser(currentUser._id));
  }, [currentUser._id, dispatch]);

  const userProjects = allProjects.filter(
    (project) => project.adminId === currentUser._id
  );

  const handleClick = (e,project)=>{
    e.preventDefault();
    history.push(`/projects/${project._id}`)
  }

  return (
    <div className="user-project-index" >
      <h2>Your Projects</h2>
      <ul>
        {allProjects.map((project) => (
          <li key={project._id} onClick={(e)=>{handleClick(e,project)}}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>
              Start Date: {project.startDate} | End Date: {project.endDate}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserProjectIndex;
