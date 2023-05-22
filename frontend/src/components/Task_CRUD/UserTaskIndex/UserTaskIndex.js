import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserTaskIndex.css';
import * as taskActions from '../../../store/task';
import { selectUser } from '../../../store/session';
import * as userActions from '../../../store/user';
import TaskCreateModal from '../TaskCreateForm/index'
import TableRow from '../../TableRow/TableRow';
import { formatDate } from '../../../store/util';

function UserTaskIndex() {
  const dispatch = useDispatch();
  const allTasks = useSelector(taskActions.getTasks);
  const currentUser = useSelector(selectUser);

  useEffect(() => {

    if (currentUser) dispatch(userActions.fetchUser(currentUser._id));
  }, [currentUser._id, dispatch]);

  const userTasks = allTasks.filter(
    (task) => task.assignee === currentUser._id
  );

  return (
    <div className="user-project-index">
      {/* <h2>Your Tasks</h2> */}
      <div className='task-table'>
      <TableRow row={["Title", "Status","End Date"]} rowClass={"task-table-header"}
      />
      {userTasks.map((t, ix) => {
        const formattedDate = formatDate(t.endDate);
        return (
          <TableRow key={ix} row={[t.title, t.status, formattedDate]}
          rowClass={"default-row-class no-hover"}
          />
        )
      })}
      </div>
      {/* <ul>
        {userTasks.map((task) => (
          <li key={task._id}>
            <h3>Task Title: {task.title}</h3>
            <p>Task Description: {task.description}</p>
            <p>
              Start Date: {task.startDate} | End Date: {task.endDate}
            </p>
          </li>
        ))}
      </ul> */}
      {/* <TaskCreateModal/> */}
    </div>
  );
}

export default UserTaskIndex;
