import { useSelector } from 'react-redux';
import './UserProjectIndex.css';
import * as projectActions from '../../../store/project';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import TableRow from '../../TableRow/TableRow';
import { getTimelineSvg } from '../../../store/util';
import { Tooltip } from 'react-tooltip';

export default function UserProjectIndex() {
  const allProjects = useSelector(projectActions.getProjects);
  const history = useHistory();

  const handleClick = (e, project) => {
    history.push(`/projects/${project._id}`)
  }

  const timelineClasses = "task-timeline-link"
  const timelineIcon = getTimelineSvg(timelineClasses);

  function handleTimelineClick(e, pid) {
    e.stopPropagation();
    history.push(`/projects/${pid}/timeline`);
  }

  return (
    <div className="user-project-index" >
      <TableRow row={["Title", "Collaborators", "Tasks", "Timeline"]} rowClass={"task-table-header"} />
      <div className="user-home-project-index-wrapper">
        {
          allProjects.length === 0
            ?
            <p className="user-project-index-new-user-message">Looks like you don't have any projects</p>
            :
            allProjects.map((p, ix) => {
              const collabCount = p.collaborators.length;
              const taskCount = p.tasks.length;

              return (
                <TableRow
                  key={ix}
                  handleClick={handleClick}
                  rowElement={p}
                  row={[
                    p.title,
                    collabCount,
                    taskCount,
                    <>
                      <button
                        className='icon-button'
                        data-tooltip-id="toTimeline"
                        onClick={(e) => { handleTimelineClick(e, p._id) }}
                      >
                        {timelineIcon}
                      </button>
                      <Tooltip id="toTimeline" effect="solid" place="top">Go to Timeline</Tooltip>
                    </>
                  ]}
                />
              )
            })
        }
      </div>
    </div>
  );

}
