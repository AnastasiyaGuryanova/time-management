import PropTypes from 'prop-types';
import { PageComponent } from '@components';
import styled from 'styled-components';

const LoaderContainer = ({ className }) => (
	<PageComponent className={className}>
		<div className="spinner" role="status"></div>
		<strong className="fs-4">Загрузка...</strong>
	</PageComponent>
);

export const Loader = styled(LoaderContainer)`
	min-height: 100vh;
	text-align: center;

	.spinner {
		width: 3rem;
		height: 3rem;
		border: 0.25em solid ${(props) => props.theme.colors.loaderColor};
		border-top-color: transparent;
		border-radius: 50%;
		animation: spinner-border 0.75s linear infinite;
		margin-right: 1rem;
	}

	strong {
		font-size: 1.25rem;
	}

	@keyframes spinner-border {
		to {
			transform: rotate(360deg);
		}
	}
`;

LoaderContainer.propTypes = {
	className: PropTypes.string,
};
