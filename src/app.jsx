import { Route, Routes } from "react-router-dom";
import { Header } from "@components";
import styled from "styled-components";

const AppContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	min-height: 100%;
	margin: 0 auto;
	background-color: ${(props) => props.theme.colors.pageBackground};
`;

const Rage = styled.div`
	width: 100%;
	min-height: 100%;
	padding: 44px 0;
`;
const Footer = styled.div`
	width: 100%;
	height: 60px;
	background-color: ${(props) => props.theme.colors.headerFooterBackground};
	color: ${(props) => props.theme.colors.headerFooterText};
`;

export const App = () => {
	return (
		<AppContent>
			<Header />
			<Rage>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<div>Авторизация</div>} />
					<Route path="/register" element={<div>Регистрация</div>} />
					<Route path="/projects" element={<div>Проекты</div>} />
					<Route path="/tasks" element={<div>Задачи</div>} />
					<Route path="/analytics" element={<div>Аналитика</div>} />
					<Route path="/settings" element={<div>Настройки</div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Rage>
			<Footer>Подвал</Footer>
		</AppContent>
	);
};
