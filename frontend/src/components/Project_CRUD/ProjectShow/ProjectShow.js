import { useDispatch, useSelector } from 'react-redux';
import { getProject, fetchProject } from '../../../store/project';
import { useEffect } from 'react';
import './ProjectShow.css';

export default function ProjectShow({ projectId }) {
  const dispatch = useDispatch();
  const project = useSelector(getProject(projectId));

  useEffect(() => {
    dispatch(fetchProject(projectId));
  }, [dispatch, projectId]);

  return (
    <div className="project-show">
      <h2>{project?.title}</h2>
      <p>{project?.description}</p>
      <p>Start Date: {project?.startDate} | End Date: {project?.endDate}</p>
    </div>
  )
}
