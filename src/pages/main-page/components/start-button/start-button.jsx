import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, H2 } from '@components';
import styled from 'styled-components';

const StartButtonContainer = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<H2>START</H2>
			<Icon
				id="fa-play-circle"
				size="420px"
				color={({ theme }) => theme.colors.colorTransparent}
				onClick={() => navigate(`/selection`)}
			/>
		</div>
	);
};

export const StartButton = styled(StartButtonContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	position: relative;

	& H2 {
		position: absolute;
		top: 53%;
		left: 50%;
		transform: translate(-50%, -50%);
		margin: 0;
		font-size: 90px;
		pointer-events: none;
	}
`;

StartButtonContainer.propTypes = {
	className: PropTypes.string,
};
