import { useState } from "react";
import styled from "styled-components";

const TooltipContainer = ({ text, children, className }) => {
	const [visible, setVisible] = useState(false);

	const showTooltip = () => setVisible(true);
	const hideTooltip = () => setVisible(false);

	return (
		<div
			className={className}
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
		>
			{children}
			{visible && <div className="tooltip">{text}</div>}
		</div>
	);
};

export const Tooltip = styled(TooltipContainer)`
	position: relative;
	display: inline-block;
	font-size: 18px;
	font-weight: 600;

	& .tooltip {
		visibility: visible;
		color: ${(props) => props.theme.colors.tooltipColor};
		position: absolute;
		z-index: 1;
		bottom: 70%;
		right: 70%;
		transform: translateY(-50%);
		opacity: 1;
		transition: opacity 0.3s;
	}

	& .tooltip::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 100%;
		margin-top: -5px;
	}
`;
