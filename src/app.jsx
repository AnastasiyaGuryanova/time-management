import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

const Content = styled.div`
	width: 100%;
	overflow: hidden;
`;

const Header = styled.div`
	width: 100%;
	height: 100px;
	background-color: #116acc;
`;

const Rage = styled.div`
	width: 100%;
	padding: 44px 0;
	background-color: #ffffff;
`;

const Container = styled.div`
	max-width: 1440px;
	margin: 0 auto;
	padding: 0 15px;
`;

export const App = () => {
	return (
		<Content>
			<Header>
				<Container>Шапка</Container>
			</Header>
			<Rage>
				<Container>
					<Routes>
						<Route path="/" element={<div>Главная страница</div>} />
						<Route path="/login" element={<div>Авторизация</div>} />
						<Route
							path="/register"
							element={<div>Регистрация</div>}
						/>
						<Route path="/projects" element={<div>Проекты</div>} />
						<Route path="/tasks" element={<div>Задачи</div>} />
						<Route
							path="/analytics"
							element={<div>Аналитика</div>}
						/>
						<Route
							path="/settings"
							element={<div>Настройки</div>}
						/>
						<Route path="*" element={<div>Ошибка</div>} />
					</Routes>
				</Container>
			</Rage>
		</Content>
	);
};
