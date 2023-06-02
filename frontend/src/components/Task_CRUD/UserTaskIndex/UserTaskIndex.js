import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserTaskIndex.css';
import * as taskActions from '../../../store/task';
import { selectUser } from '../../../store/session';
import * as userActions from '../../../store/user';
import TableRow from '../../TableRow/TableRow';
import { formatDate, monthDayYear } from '../../../store/util';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

export default function UserTaskIndex({ projects }) {
  const dispatch = useDispatch();
  const allTasks = useSelector(taskActions.getTasks);
  const currentUser = useSelector(selectUser);
  const history = useHistory();

  useEffect(() => {

    if (currentUser) dispatch(userActions.fetchUser(currentUser._id));
  }, [currentUser._id, dispatch, currentUser]);

  const userTasks = allTasks.filter(
    (task) => task.assignee === currentUser._id
  );

  return (
    <div className="user-project-index">
      <div className='task-table'>
        <TableRow row={["Title", "Status", "Due", "Project"]} rowClass={"task-table-header"}
        />
        <div className="user-home-task-table-wrapper">
          {
            userTasks.length === 0
              ?
              <p className="user-task-index-new-user-message">Looks like you don't have any tasks</p>
              :
              userTasks.map((t, ix) => {
                const formattedDate = monthDayYear(formatDate(t.endDate));

                let projectTitle = "";

                if (t.projectId) {
                  projectTitle = projects[t.projectId].title;
                }

                return (
                  <TableRow key={ix} row={[t.title, t.status, formattedDate, projectTitle]}
                    rowClass={"default-row-class"}
                    rowElement={t.projectId}
                    handleClick={(e, rowElement) => { history.push(`/projects/${rowElement}`) }}
                  />
                )
              })
          }
        </div>
      </div>
    </div>
  );

}
