import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useServerRequest, usePaginationAndSearch } from '@hooks';
import { loadTasksProjectAsync } from '@actions';
import { Search, Pagination, Loader } from '@components';
import { selectTasks } from '@selectors';
import { PAGINATION_LIMIT } from '@constants';
import { Task } from './components';
import styled from 'styled-components';

const TasksContainer = ({ className, projectId }) => {
	const dispatch = useDispatch();
	const tasks = useSelector(selectTasks);
	const requestServer = useServerRequest();

	const {
		searchPhrase,
		handleSearchChange,
		totalItems,
		itemsToShow,
		handlePageChange,
	} = usePaginationAndSearch(tasks || [], 'taskText');

	useEffect(() => {
		dispatch(loadTasksProjectAsync(requestServer, projectId));
	}, [dispatch, requestServer, projectId]);

	if (tasks === null) {
		return <Loader />;
	}

	const noTasksMessage = searchPhrase
		? 'Задачи с таким названием не найдены'
		: 'Нет активных задач в проекте';

	return (
		<div className={className}>
			{tasks.length > 0 && (
				<Search searchPhrase={searchPhrase} onChange={handleSearchChange} />
			)}

			{itemsToShow.length > 0 ? (
				itemsToShow.map((task) => <Task key={task.id} task={task} />)
			) : (
				<div className="no-active-tasks">{noTasksMessage}</div>
			)}

			{totalItems > PAGINATION_LIMIT && (
				<Pagination totalItems={totalItems} onPageChange={handlePageChange} />
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

TasksContainer.propTypes = {
	className: PropTypes.string,
	projectId: PropTypes.string.isRequired,
};
