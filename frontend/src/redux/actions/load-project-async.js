import { setProjectData } from "./set-project-data";

export const loadProjectAsync = (requestServer, projectId) => (dispatch) => {
	return requestServer("fetchProject", projectId).then((projectData) => {
		if (projectData.res) {
			dispatch(setProjectData(projectData.res));
		}
		return projectData;
	});
};
