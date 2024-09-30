import { setTasksAllProjects } from './set-tasks-all-projects';
import { request } from '@helpers';

export const loadTasksAllProjectsAsync = () => (dispatch) =>
	request('/tasks', 'GET').then((tasksData) => {
		if (tasksData.data) {
			dispatch(setTasksAllProjects(tasksData.data));
		}
		return tasksData;
	});
