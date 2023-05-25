import { useSelector } from 'react-redux';
import './UserProjectIndex.css';
import * as projectActions from '../../../store/project';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import TableRow from '../../TableRow/TableRow';
import { getTimelineSvg } from '../../../store/util';

function UserProjectIndex() {
  const allProjects = useSelector(projectActions.getProjects);
  const history = useHistory();

  const handleClick = (e,project)=>{
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
      <TableRow row={["Title", "Collaborators","Tasks", "Timeline"]} rowClass={"task-table-header"}/>
      {allProjects.map((p, ix) => {
        const collabCount = p.collaborators.length;
        const taskCount = p.tasks.length;
        return (
          <TableRow key={ix} handleClick={handleClick} rowElement={p} row={[
            p.title, 
            collabCount,
            taskCount,
            <div onClick={(e) => {handleTimelineClick(e, p._id)}}>{timelineIcon}</div>
          ]}/>
        )
      })}
    </div>
  );
}

export default UserProjectIndex;
