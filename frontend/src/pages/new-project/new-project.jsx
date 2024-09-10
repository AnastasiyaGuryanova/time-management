import { useLayoutEffect } from 'react';
import { useMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { RESET_PROJECT_DATA } from '@actions';
import { ProjectForm, H2, PageComponent } from '@components';
import { selectProject } from '@selectors';
import styled from 'styled-components';

const NewProjectContainer = ({ className }) => {
	const dispatch = useDispatch();
	const isCreating = useMatch('/project/new');
	const project = useSelector(selectProject);

	useLayoutEffect(() => {
		dispatch(RESET_PROJECT_DATA);
	}, [dispatch, isCreating]);

	return (
		<PageComponent className={className}>
			<H2>Новый проект</H2>
			<ProjectForm project={project} />
		</PageComponent>
	);
};

export const NewProject = styled(NewProjectContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
	max-width: 1440px;
	width: 100%;
	margin: 0 auto auto;
	padding-top: 50px;
`;

NewProjectContainer.propTypes = {
	className: PropTypes.string,
};
