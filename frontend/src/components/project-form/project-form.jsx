import { useState, useLayoutEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Input } from '@components';
import { saveProjectAsync } from '@actions';
import { sanitizeContent } from './utils';
import styled from 'styled-components';

const ProjectFormContainer = ({ project: { id, title, description }, className }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [titleValue, setTitleValue] = useState(title || '');
	const descriptionRef = useRef(null);

	useLayoutEffect(() => {
		setTitleValue(title);
	}, [title]);

	const onTitleChange = ({ target }) => {
		setTitleValue(target.value);
	};

	const onSave = () => {
		const newDescription = sanitizeContent(descriptionRef.current.innerHTML);

		if (titleValue && newDescription) {
			dispatch(
				saveProjectAsync(id, {
					title: titleValue,
					description: newDescription,
				}),
			).then(() => navigate(`/projects`));
		} else {
			alert('Заполните все поля');
		}
	};

	const handleCancel = () => {
		navigate('/projects');
	};

	return (
		<div className={className}>
			<div className="container">
				<p>Название проекта:</p>
				<Input
					value={titleValue}
					placeholder="Название ..."
					margin="0 0 10px 0"
					onChange={onTitleChange}
				/>
			</div>

			<div className="container">
				<p>Описание проекта:</p>
				<div
					ref={descriptionRef}
					contentEditable={true}
					suppressContentEditableWarning={true}
					className="description"
				>
					{description}
				</div>
			</div>

			<div className="buttons">
				<Button onClick={onSave}>Сохранить</Button>
				<Button margin="0 0 0 20px" onClick={handleCancel}>
					Отмена
				</Button>
			</div>
		</div>
	);
};

export const ProjectForm = styled(ProjectFormContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
	max-width: 1000px;
	width: 100%;
	color: ${(props) => props.theme.colors.mainText};

	& .container {
		width: 100%;

		> p {
			margin: 10px 0 5px;
		}
	}

	& .description {
		min-height: 170px;
		font-size: 18px;
		width: 100%;
		padding: 10px;
		background-color: ${(props) => props.theme.colors.textInputFieldBackground};
		border: 1px solid ${(props) => props.theme.colors.borderColor};
		border-radius: 7px;
		transition: background-color 0.3s ease;

		&:focus {
			background-color: ${(props) =>
				props.theme.colors.textInputFieldBackgroundActive};
		}
	}

	& .buttons {
		margin-top: 30px;
	}
`;

ProjectFormContainer.propTypes = {
	project: PropTypes.shape({
		id: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
	}).isRequired,
	className: PropTypes.string,
};
