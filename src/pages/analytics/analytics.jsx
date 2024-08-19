import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasksAllProjectsAsync, loadProjectsAsync } from '@actions';
import { selectTasksAllProjects, selectProjects } from '@selectors';
import { useServerRequest } from '@hooks';
import { H2 } from '@components';
import {
	Filters,
	TimeSpentBarChart,
	TimeDistributionPieChart,
	PageComponent,
} from './components';
import { filterTasksByDate, filterTasksByProject, groupTasksByProject } from './utils';
import styled from 'styled-components';

const AnalyticsContainer = ({ className }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const tasks = useSelector(selectTasksAllProjects);
	const projects = useSelector(selectProjects);

	const [projectData, setProjectData] = useState([]);
	const [noTasksMessage, setNoTasksMessage] = useState('');

	useEffect(() => {
		dispatch(loadTasksAllProjectsAsync(requestServer));
		dispatch(loadProjectsAsync(requestServer));
	}, [dispatch, requestServer]);

	useEffect(() => {
		handleApplyFilters({ selectedProject: 'all' });
	}, [tasks, projects]);

	const handleApplyFilters = (filters) => {
		let filteredTasks = tasks;
		setNoTasksMessage('');

		filteredTasks = filterTasksByDate(
			filteredTasks,
			filters.dateFrom,
			filters.dateTo,
		);

		filteredTasks = filterTasksByProject(filteredTasks, filters.selectedProject);

		if (filteredTasks.length === 0) {
			setNoTasksMessage('Нет задач за указанный период.');
			setProjectData([]);
		} else {
			if (filters.selectedProject && filters.selectedProject !== 'all') {
				setProjectData(
					filteredTasks.map((task) => ({
						projectTitle: `Задача: ${task.taskText}`,
						duration: task.duration,
					})),
				);
			} else {
				const projectDurations = groupTasksByProject(filteredTasks, projects);
				setProjectData(projectDurations);
			}
		}
	};

	return (
		<PageComponent className={className}>
			<H2>Аналитика</H2>

			<Filters projects={projects} onApplyFilters={handleApplyFilters} />

			{noTasksMessage ? (
				<p>{noTasksMessage}</p>
			) : (
				<div className="charts">
					<div className="container-chart">
						<h3>Распределение времени по проектам</h3>
						<TimeDistributionPieChart data={projectData} />
					</div>
					<div className="container-chart">
						<h3>Время, затраченное на задачи</h3>
						<TimeSpentBarChart data={projectData} />
					</div>
				</div>
			)}
		</PageComponent>
	);
};

export const Analytics = styled(AnalyticsContainer)`
	font-size: 18px;

	& .charts {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
		width: 100%;
	}

	& .container-chart {
		text-align: center;
		width: 49%;
		aspect-ratio: 1;
		padding: 0 30px 15px 30px;
		background-color: ${(props) => props.theme.colors.analiticsComponentBackground};
		border: 1px solid ${(props) => props.theme.colors.borderColor};
		border-radius: 7px;
	}
`;
