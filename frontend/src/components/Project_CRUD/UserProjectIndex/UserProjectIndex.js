import { useSelector } from 'react-redux';
import './UserProjectIndex.css';
import * as projectActions from '../../../store/project';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import TableRow from '../../TableRow/TableRow';

function UserProjectIndex() {
  const allProjects = useSelector(projectActions.getProjects);
  const history = useHistory();

  const handleClick = (e,project)=>{
    e.preventDefault();
    history.push(`/projects/${project._id}`)
  }

  return (
    <div className="user-project-index" >
      <TableRow row={["Title", "Collaborators","Tasks"]} rowClass={"task-table-header"}/>
      {allProjects.map((p, ix) => {
        const collabCount = p.collaborators.length;
        const taskCount = p.tasks.length;
        return (
          <TableRow key={ix} handleClick={handleClick} rowElement={p} row={[p.title, collabCount, taskCount]}/>
        )
      })}
    </div>
  );
}

export default UserProjectIndex;
