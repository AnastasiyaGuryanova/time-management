import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTasksAllProjectsAsync, loadProjectsAsync } from "@actions";
import { selectTasksAllProjects, selectProjects } from "@selectors";
import { useServerRequest } from "@hooks";
import { H2 } from "@components";
import {
	Filters,
	TimeSpentBarChart,
	TimeDistributionPieChart,
} from "./components";
import {
	filterTasksByDate,
	filterTasksByProject,
	groupTasksByProject,
} from "./utils";
import styled from "styled-components";

const AnalyticsContainer = ({ className }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const tasks = useSelector(selectTasksAllProjects);
	const projects = useSelector(selectProjects);

	const [projectData, setProjectData] = useState([]);
	const [noTasksMessage, setNoTasksMessage] = useState("");

	useEffect(() => {
		dispatch(loadTasksAllProjectsAsync(requestServer));
		dispatch(loadProjectsAsync(requestServer));
	}, [dispatch, requestServer]);

	useEffect(() => {
		handleApplyFilters({ selectedProject: "all" });
	}, [tasks, projects]);

	const handleApplyFilters = (filters) => {
		let filteredTasks = tasks;
		setNoTasksMessage("");

		filteredTasks = filterTasksByDate(
			filteredTasks,
			filters.dateFrom,
			filters.dateTo,
		);

		filteredTasks = filterTasksByProject(
			filteredTasks,
			filters.selectedProject,
		);

		if (filteredTasks.length === 0) {
			setNoTasksMessage("Нет задач за указанный период.");
			setProjectData([]);
		} else {
			if (filters.selectedProject && filters.selectedProject !== "all") {
				setProjectData(
					filteredTasks.map((task) => ({
						projectTitle: `Задача: ${task.taskText}`,
						duration: task.duration,
					})),
				);
			} else {
				const projectDurations = groupTasksByProject(
					filteredTasks,
					projects,
				);
				setProjectData(projectDurations);
			}
		}
	};

	// const handleApplyFilters = (filters) => {
	// 	let result = tasks;
	// 	setNoTasksMessage("");

	// 	// Фильтрация по датам
	// 	if (filters.dateFrom) {
	// 		const dateFrom = new Date(filters.dateFrom);
	// 		result = result.filter(
	// 			(task) => new Date(task.startTime) >= dateFrom,
	// 		);
	// 	}

	// 	if (filters.dateTo) {
	// 		const dateTo = new Date(filters.dateTo);
	// 		result = result.filter((task) => new Date(task.endTime) <= dateTo);
	// 	}

	// 	// Фильтрация по проекту
	// 	if (filters.selectedProject && filters.selectedProject !== "all") {
	// 		result = result.filter(
	// 			(task) => task.projectId === filters.selectedProject,
	// 		);
	// 	}

	// 	if (result.length === 0) {
	// 		setNoTasksMessage("Нет задач за указанный период.");
	// 		setProjectData([]);
	// 	} else {
	// 		if (filters.selectedProject && filters.selectedProject !== "all") {
	// 			// Если выбран конкретный проект, то показываем задачи этого проекта
	// 			setProjectData(
	// 				result.map((task) => ({
	// 					projectTitle: `Задача: ${task.taskText}`,
	// 					duration: task.duration,
	// 				})),
	// 			);
	// 		} else {
	// 			// Если проект не выбран, то группируем задачи по проектам
	// 			const projectDurations = projects
	// 				.map((project) => {
	// 					const tasksForProject = result.filter(
	// 						(task) => task.projectId === project.id,
	// 					);

	// 					const totalDuration = tasksForProject.reduce(
	// 						(sum, task) => sum + task.duration,
	// 						0,
	// 					);

	// 					return {
	// 						projectTitle: project.title,
	// 						duration: totalDuration,
	// 					};
	// 				})
	// 				.filter((item) => item.duration > 0);

	// 			setProjectData(projectDurations);
	// 		}
	// 	}
	// };

	return (
		<div className={className}>
			<H2>Аналитика</H2>

			<Filters projects={projects} onApplyFilters={handleApplyFilters} />

			{noTasksMessage ? (
				<p>{noTasksMessage}</p>
			) : (
				<div className="charts">
					<div className="container-chart">
						<h3>Время, затраченное на задачи</h3>
						<TimeSpentBarChart data={projectData} />
					</div>

					<div className="container-chart">
						<h3>Распределение времени по проектам</h3>
						<TimeDistributionPieChart data={projectData} />
					</div>
				</div>
			)}
		</div>
	);
};

export const Analytics = styled(AnalyticsContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	max-width: 1440px;
	width: 100%;
	margin: 0 auto auto;
	padding: 50px 0;
	font-size: 18px;
	color: ${(props) => props.theme.colors.pageText};

	& .charts {
		display: flex;
		justify-content: space-around;
		width: 100%;
	}

	& .container-chart {
		text-align: center;
		width: 50%;
		aspect-ratio: 1;
		padding: 0 30px;
	}
`;
