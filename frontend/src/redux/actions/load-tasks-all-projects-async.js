import { setTasksAllProjects } from './set-tasks-all-projects';

export const loadTasksAllProjectsAsync = (requestServer) => (dispatch) => {
	return requestServer('fetchTasksAllProjects').then((tasksData) => {
		if (tasksData.res) {
			dispatch(setTasksAllProjects(tasksData.res));
		}
		return tasksData;
	});
};
