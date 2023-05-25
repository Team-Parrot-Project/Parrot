import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProject, updateProject } from '../../../store/project';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { addDaysToDate, formatDate } from '../../../store/util';
import { Tooltip } from 'react-tooltip'
import './ProjectUpdateForm.css';

export default function ProjectUpdateForm({ closeModal }) {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const project = useSelector(getProject(projectId));
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [collaborators, setCollaborators] = useState([]);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    // This effect hook will run only when the project state variable is set
    if (project) {
      setProjectName(project.title);
      setDescription(project.description);
      setStartDate(formatDate(project.startDate));
      setEndDate(formatDate(project.endDate));
      setCollaborators(project.collaborators);
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName || !description || !startDate || !endDate) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedProject = {
      id: projectId,
      title: projectName,
      description: description,
      startDate: startDate,
      endDate: endDate,
      collaborators: collaborators
    };
    try {
      dispatch(updateProject(updatedProject));
      closeModal();
    } catch (err) {
      alert('Failed to update project. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-update-form">
      <p className="project-update-form-title">Please fill out to update this project</p>
      <button type="submit">Update</button>
      <label htmlFor="projectName">Project Name</label>
      <input
        type="text"
        id="projectName"
        className="project-update-form-title-input"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        className="project-update-form-description-input"
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="project-update-form-date-wrapper">
        <div>
          <div>
            <label htmlFor="startDate">Start Date</label>
          </div>
          <div>
            <input
              type="date"
              id="startDate"
              className="project-update-form-start-date-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="endDate">End Date</label>
          </div>
          <div>
            <input
              type="date"
              id="endDate"
              className="project-update-form-end-date-input"
              value={endDate}
              min={addDaysToDate(startDate, 1)}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="collaborators">Collaborators</label>
          </div>
          <div>
            <select data-tooltip-id="clickCtrlMultipe" className="project-update-form-collaborators-input" id="collaborators" value={collaborators} onChange={(e) =>
              setCollaborators(Array.from(e.target.selectedOptions, (option) => option.value))} multiple>
              {Object.values(users).map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
            <Tooltip id="clickCtrlMultipe" effect="solid" place="bottom">
              Hold ctrl & click to select multiple collaborators
            </Tooltip>
          </div>
        </div>
      </div>

    </form>
  );
}
