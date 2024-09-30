import { setTaskData } from './set-task-data';
import { loadTasksAllProjectsAsync } from './load-tasks-all-projects-async';
import { loadTasksProjectAsync } from './load-tasks-project-async';
import { request } from '@helpers';

export const saveTaskAsync = (projectId, id, newTaskData) => (dispatch) => {
	const saveRequest = id
		? request(`/projects/${projectId}/task/${id}`, 'PATCH', newTaskData)
		: request(`/projects/${projectId}/task`, 'POST', newTaskData);

	return saveRequest.then((updatedTask) => {
		dispatch(setTaskData(updatedTask.data));
		dispatch(loadTasksAllProjectsAsync());
		dispatch(loadTasksProjectAsync(projectId));

		return updatedTask.data;
	});
};
