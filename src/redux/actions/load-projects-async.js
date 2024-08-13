import { setProjectsData } from "./set-projects-data";

export const loadProjectsAsync = (requestServer) => (dispatch) => {
	return requestServer("fetchProjects").then((projectsData) => {
		if (projectsData.res) {
			dispatch(setProjectsData(projectsData.res));
		}
		return projectsData;
	});
};
