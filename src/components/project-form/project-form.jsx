import { useState, useLayoutEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@components";
import { saveProjectAsync } from "@actions";
import { useServerRequest } from "@hooks";
import { sanitizeContent } from "./utils";
import styled from "styled-components";

const ProjectFormContainer = ({
	project: { id, title, description },
	className,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	const [titleValue, setTitleValue] = useState(title);
	const descriptionRef = useRef(null);

	useLayoutEffect(() => {
		setTitleValue(title);
	}, [title]);

	const onTitleChange = ({ target }) => {
		setTitleValue(target.value);
	};

	const onSave = () => {
		const newDescription = sanitizeContent(
			descriptionRef.current.innerHTML,
		);

		if (titleValue && newDescription) {
			dispatch(
				saveProjectAsync(requestServer, {
					id,
					title: titleValue,
					description: newDescription,
				}),
			).then(() => navigate(`/projects`));
		} else {
			alert("Заполните все поля");
		}
	};

	const handleCancel = () => {
		navigate("/projects");
	};

	return (
		<div className={className}>
			<Input
				value={titleValue}
				placeholder="Название ..."
				onChange={onTitleChange}
			/>

			<div className="container-description">
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
	color: ${(props) => props.theme.colors.pageText};

	& .container-description {
		width: 100%;

		> p {
			margin: 10px 0 5px;
		}
	}

	& .description {
		min-height: 200px;
		font-size: 18px;
		width: 100%;
		padding: 10px;
		border: 1px solid ${(props) => props.theme.colors.borderColor};
		border-radius: 7px;
		transition: background-color 0.3s ease;

		&:focus {
			background-color: ${(props) =>
				props.theme.colors.inputBackgroundActive};
		}
	}

	& .buttons {
		margin-top: 30px;
	}

	& button:hover {
		background-color: ${(props) => props.theme.colors.pageButtonHover};
	}
`;
