import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '@hooks';
import { loadTasksProjectAsync } from '@actions';
import { Search, Pagination, Loader } from '@components';
import { selectTasks } from '@selectors';
import { debounce } from '@helpers';
import { PAGINATION_LIMIT } from '@constants';
import { Task } from './components';
import styled from 'styled-components';

const TasksContainer = ({ className, projectId }) => {
	const dispatch = useDispatch();
	const tasks = useSelector(selectTasks);
	const requestServer = useServerRequest();

	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		dispatch(loadTasksProjectAsync(requestServer, projectId));
	}, [dispatch, requestServer, projectId]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const handleSearchChange = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(true);
	};

	const filteredTasks = shouldSearch
		? tasks.filter(({ taskText }) =>
				taskText.toLowerCase().includes(searchPhrase.toLowerCase()),
			)
		: tasks;

	if (tasks === null) {
		return <Loader />;
	}

	const totalTasks = filteredTasks.length || 0;

	const startIndex = (currentPage - 1) * PAGINATION_LIMIT;
	const endIndex = startIndex + PAGINATION_LIMIT;
	const tasksToShow = filteredTasks.slice(startIndex, endIndex);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const noTasksMessage = shouldSearch
		? 'Задачи с таким названием не найдены'
		: 'Нет активных задач в проекте';

	return (
		<div className={className}>
			{tasks.length > 0 && (
				<Search searchPhrase={searchPhrase} onChange={handleSearchChange} />
			)}

			{tasksToShow.length > 0 ? (
				tasksToShow.map((task) => <Task key={task.id} task={task} />)
			) : (
				<div className="no-active-tasks">{noTasksMessage}</div>
			)}

			{totalTasks > PAGINATION_LIMIT && (
				<Pagination totalItems={totalTasks} onPageChange={handlePageChange} />
			)}
		</div>
	);
};

export const Tasks = styled(TasksContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
	max-width: 1000px;
	width: 100%;
	font-size: 18px;
	color: ${(props) => props.theme.colors.mainText};

	& .no-active-tasks {
		margin-top: 20px;
		font-size: 20px;
		font-weight: 500;
	}
`;
