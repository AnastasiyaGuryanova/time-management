import { setTasksProject } from "./set-tasks-project";

export const loadTasksProjectAsync =
	(requestServer, projectId) => (dispatch) => {
		return requestServer("fetchTasksProject", projectId).then(
			(response) => {
				if (response.res) {
					dispatch(setTasksProject(response.res));
				}
				return response;
			},
		);
	};
