import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProjectsAsync } from '@actions';
import { selectProjects } from '@selectors';
import { useServerRequest } from '@hooks';
import { H2, PageComponent, Search, Loader, Pagination } from '@components';
import { debounce } from '@helpers';
import { PAGINATION_LIMIT } from '@constants';
import { ProjectCard, CardCreate } from './components';
import styled from 'styled-components';

const AllProjectsPageContainer = ({ className }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const projects = useSelector(selectProjects);

	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		dispatch(loadProjectsAsync(requestServer));
	}, [dispatch, requestServer]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const handleSearchChange = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	const filteredProjects = shouldSearch
		? projects.filter(({ title }) =>
				title.toLowerCase().includes(searchPhrase.toLowerCase()),
			)
		: projects;

	if (projects === null) {
		return <Loader />;
	}

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const totalProjects = filteredProjects.length || 0;

	const startIndex = (currentPage - 1) * PAGINATION_LIMIT;
	const endIndex = startIndex + PAGINATION_LIMIT;
	const projectsToShow = filteredProjects.slice(startIndex, endIndex);

	const showNoProjectsMessage = projects.length === 0;
	const showNoSearchResultsMessage = searchPhrase && filteredProjects.length === 0;

	return (
		<PageComponent className={className}>
			<H2>Мои проекты</H2>

			{currentPage === 1 && <CardCreate />}

			{!showNoProjectsMessage && (
				<Search searchPhrase={searchPhrase} onChange={handleSearchChange} />
			)}

			<div className="container">
				{projectsToShow.map(({ id, title, description, createdAt }) => (
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

			{totalProjects > PAGINATION_LIMIT && (
				<Pagination totalItems={totalProjects} onPageChange={handlePageChange} />
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
