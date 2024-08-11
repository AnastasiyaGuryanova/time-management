import { Icon } from "../icon/icon";
import styled from "styled-components";

const CardCreateContainer = ({ className, children, ...props }) => {
	return (
		<div className={className} {...props}>
			<Icon id="fa-plus-square-o" margin="0 10px 0 0" size="50px" />
			<h3 className="title-new-project">{children}</h3>
		</div>
	);
};

export const CardCreate = styled(CardCreateContainer)`
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	border: 1px solid ${(props) => props.theme.colors.borderColor};
	border-radius: 8px;
	padding: 30px;
	cursor: pointer;
	background-color: ${(props) => props.theme.colors.CardCreateBackground};
	transition: background-color 0.3s ease;
	transition: color 0.3s ease;

	i {
		transition: color 0.3s ease;
	}

	& .title-new-project {
		text-align: center;
		margin: 0;
		font-size: 22px;
	}

	&:hover {
		background-color: ${(props) =>
			props.theme.colors.CardCreateBackgroundHover};
		color: ${(props) => props.theme.colors.CardCreateColorHover};
		i {
			color: ${(props) => props.theme.colors.CardCreateColorHover};
		}
	}
`;
