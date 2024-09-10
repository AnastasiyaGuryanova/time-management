import PropTypes from 'prop-types';
import styled from 'styled-components';

const PageComponentContainer = ({ className, children, ...props }) => {
	return (
		<div className={className} {...props}>
			{children}
		</div>
	);
};

export const PageComponent = styled(PageComponentContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	max-width: 1440px;
	width: 100%;
	margin: 0 auto auto;
	padding: 50px 0;
	color: ${(props) => props.theme.colors.mainText};
`;

PageComponentContainer.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};
