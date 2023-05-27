import React from 'react';
import NavBar from '../NavBar/NavBar';
import './ProjectHome.css';
import { useDispatch, useSelector } from 'react-redux';
import ProjectTaskIndex from './ProjectTaskIndex/ProjectTaskIndex';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import * as projectActions from '../../store/project';
import { useEffect, useState } from 'react';
import * as taskActions from '../../store/task';
import TaskRecommendation from '../UserHome/TaskRecommendation/TaskRecommendation';
import TaskCreateModal from '../Task_CRUD/TaskCreateForm/';
import ProjectUpdateModal from '../Project_CRUD/ProjectUpdateForm/';
import DeleteProjectModal from '../Project_CRUD/ProjectDelete/ProjectDeleteModal';
import { formatDate } from '../../store/util';
import { fetchUsers } from '../../store/user';
import { setProjectId } from '../../store/timeframeActions';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function ProjectHome() {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [recommendedTasks, setRecommendedTasks] = useState([]);
  const projects = useSelector(state => state.projects);
  const [project, setProject] = useState();

  useEffect(() => {
    if(projects) {
      setProject(projects[projectId]);
    }
  }, [projects, projectId])

  // const project = useSelector((state) => state.projects[projectId]);

  useEffect(() => {
    dispatch(taskActions.purgeTasks());
    dispatch(projectActions.fetchProject(projectId));
    dispatch(fetchUsers())
  }, [projectId, dispatch]);

  // caluclates the positon of the dot to be at a accurate point on the line
  function calculateDotPosition(startDate, endDate) {
    const today = new Date();
    if (!startDate || !endDate) {
      return "0px"; // Return a default position if either startDate or endDate is undefined
    }
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const totalDuration = endDateObj.getTime() - startDateObj.getTime();
    const progress = (today.getTime() - startDateObj.getTime()) / totalDuration;
    const container = document.querySelector(".date-line-container");
    const containerWidth = container ? container.clientWidth : 0;
    const dotPosition = progress * containerWidth;
    return `${dotPosition}px`;
  }

  // Checks to make sure the date is in range so that it only shows up for today being in range
  function isTodayInRange(startDate, endDate) {
    const today = formatDate(new Date());
    return today >= formatDate(startDate) && today <= formatDate(endDate);
  }

  // Used to allow the user to flip between projects
  const handleProjectIdChange = (event) => {
    const selectedProjectId = event.target.value;
    dispatch(setProjectId(selectedProjectId));
    const projectLink = `/projects/${selectedProjectId}`;
    window.location.href = projectLink;
  }

  return (
    <>
      <div className="project-home-wrapper">
        <NavBar />
        <div className="centered-container">
          <h1 className="project-home-table-title">  {project?.title
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}</h1>
          <h2 className="project-home-table-title">  {project?.description && (
            <span>{project.description.charAt(0).toUpperCase() + project.description.slice(1)}</span>
          )}
          </h2>
          <div className="date-line-container">
            <div className="date-line"></div>
            {isTodayInRange(project?.startDate, project?.endDate) ? <div className="date-dot" style={{ left: calculateDotPosition(project?.startDate, project?.endDate) }}></div> : ""}
            <div className="date-label start-date">{formatDate(project?.startDate)}</div>
            <div className="date-label end-date">{formatDate(project?.endDate)}</div>
            {isTodayInRange(project?.startDate, project?.endDate) ? <div className="date-label today" style={{ left: calculateDotPosition(project?.startDate, project?.endDate) }}>
              Today
            </div> : ""}
          </div>

          <ProjectUpdateModal />
          <TaskCreateModal />
          <DeleteProjectModal />

          <div className="project-show-filter-group">
            <label className="project-show-filter-group-title">Project:</label>
            <select className="project-show-filter-select" onChange={handleProjectIdChange} value={projectId}>
              {Object.values(projects).map((project) => (
                <option key={project._id} value={project._id}>
                  {`${project.title}`}
                </option>
              ))}
            </select>
          </div>

          <ProjectTaskIndex />
          <TaskRecommendation project={project} recommendedTasks={recommendedTasks} setRecommendedTasks={setRecommendedTasks} />
          <div className="slider">
            <Slider>
              {recommendedTasks.length > 0 && recommendedTasks.map((taskTitle, idx) => (
                <>
                  <TaskCreateModal key={taskTitle} taskTitle={taskTitle} />
                  <p>{idx + 1}. {taskTitle}</p>
                </>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );

}
