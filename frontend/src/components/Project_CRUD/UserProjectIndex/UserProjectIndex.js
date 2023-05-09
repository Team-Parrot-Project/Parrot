import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserProjectIndex.css';
import { getProjects, getProjects } from '../../../store/project';
import { selectUser } from '../../../store/session';

function UserProjectIndex() {
  const dispatch = useDispatch();
  const allProjects = useSelector(getProjects);
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const userProjects = allProjects.filter(
    (project) => project.adminId === currentUser.id
  );

  return (
    <div className="user-project-index">
      <h2>Your Projects</h2>
      <ul>
        {userProjects.map((project) => (
          <li key={project.id}>
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
