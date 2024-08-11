import { setTasks } from "./set-tasks";

export const loadTasksAsync = (requestServer, projectId) => (dispatch) => {
	return requestServer("fetchTasks", projectId).then((response) => {
		if (response.res) {
			dispatch(setTasks(response.res));
		}
		return response;
	});
};
