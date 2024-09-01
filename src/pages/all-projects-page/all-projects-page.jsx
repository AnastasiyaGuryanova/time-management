import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProjectsAsync } from '@actions';
import { selectProjects } from '@selectors';
import { useServerRequest, usePaginationAndSearch } from '@hooks';
import { H2, PageComponent, Search, Loader, Pagination } from '@components';
import { PAGINATION_LIMIT } from '@constants';
import { ProjectCard, CardCreate } from './components';
import styled from 'styled-components';

const AllProjectsPageContainer = ({ className }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const projects = useSelector(selectProjects);

	const {
		searchPhrase,
		handleSearchChange,
		currentPage,
		totalItems,
		itemsToShow,
		handlePageChange,
	} = usePaginationAndSearch(projects || [], 'title');

	useEffect(() => {
		dispatch(loadProjectsAsync(requestServer));
	}, [dispatch, requestServer]);

	if (projects === null) {
		return <Loader />;
	}

	const showNoProjectsMessage = projects.length === 0;
	const showNoSearchResultsMessage = searchPhrase && itemsToShow.length === 0;

	return (
		<PageComponent className={className}>
			<H2>Мои проекты</H2>

			{currentPage === 1 && <CardCreate />}

			{!showNoProjectsMessage && (
				<Search searchPhrase={searchPhrase} onChange={handleSearchChange} />
			)}

			<div className="container">
				{itemsToShow.map(({ id, title, description, createdAt }) => (
					<ProjectCard
						key={id}
						id={id}
						title={title}
						description={description}
						createdAt={createdAt}
					/>
				))}

				{showNoProjectsMessage && (
					<p className="no-projects-message">Нет активных проектов</p>
				)}

				{showNoSearchResultsMessage && (
					<p className="no-search-results-message">
						Проектов с таким названием не найдено
					</p>
				)}
			</div>

			{totalItems > PAGINATION_LIMIT && (
				<Pagination totalItems={totalItems} onPageChange={handlePageChange} />
			)}
		</PageComponent>
	);
};

export const AllProjectsPage = styled(AllProjectsPageContainer)`
	& .container {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: space-between;
	}
`;
