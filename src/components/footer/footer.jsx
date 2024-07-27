import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterLinks = styled.div`
	display: flex;
	flex-direction: column;
`;

const FooterContainer = ({ className }) => {
	return (
		<footer className={className}>
			<FooterLinks>
				<Link to="/privacy-policy">Политика конфиденциальности</Link>
				<Link to="/terms-of-service">Условия использования</Link>
			</FooterLinks>
			<div>
				<div>
					© {new Date().getFullYear()} MyApp. Все права защищены.
				</div>
				<div>
					Эта информация может быть изменена без предварительного
					уведомления.
				</div>

				<a href="mailto:guryanova.anastasi@gmail.com">
					guryanova.anastasi@gmail.com
				</a>
			</div>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 100px;
	padding: 0 50px;
	box-shadow: 0 -2px 15px ${(props) => props.theme.colors.headerFootersHadow};
	background-color: ${(props) => props.theme.colors.headerFooterBackground};
	color: ${(props) => props.theme.colors.headerFooterText};

	transition: color 0.3s ease;

	a:hover {
		text-decoration: underline;
		color: ${(props) => props.theme.colors.footerHoverColor};
	}
`;
