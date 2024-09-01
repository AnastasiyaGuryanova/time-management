import { setTaskData } from './set-task-data';
import { loadTasksAllProjectsAsync } from './load-tasks-all-projects-async';

export const saveTaskAsync = (requestServer, newTaskData) => (dispatch) =>
	requestServer('saveTask', newTaskData).then((updatedTask) => {
		dispatch(setTaskData(updatedTask.res));
		dispatch(loadTasksAllProjectsAsync(requestServer));

		return updatedTask.res;
	});
