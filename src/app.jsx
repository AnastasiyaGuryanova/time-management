import { useLayoutEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Header, PrivateRoute, Footer } from "@components";
import { Autorization } from "@pages";
import { setUser } from "@actions";
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

export const App = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem("userData");

		if (!currentUserDataJSON) return;

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
			}),
		);
	}, [dispatch]);

	return (
		<AppContent>
			<Header />
			<Rage>
				<Routes>
					<Route path="/login" element={<Autorization />} />
					<Route path="/register" element={<div>Регистрация</div>} />

					<Route
						path="/"
						element={
							<PrivateRoute>
								<div>Главная страница</div>
							</PrivateRoute>
						}
					/>
					<Route
						path="/projects"
						element={
							<PrivateRoute>
								<div>Проекты</div>
							</PrivateRoute>
						}
					/>
					<Route
						path="/tasks"
						element={
							<PrivateRoute>
								<div>Задачи</div>
							</PrivateRoute>
						}
					/>
					<Route
						path="/analytics"
						element={
							<PrivateRoute>
								<div>Аналитика</div>
							</PrivateRoute>
						}
					/>
					<Route
						path="/settings"
						element={
							<PrivateRoute>
								<div>Настройки</div>
							</PrivateRoute>
						}
					/>
					<Route
						path="/privacy-policy"
						element={<div>Политика конфиденциальности</div>}
					/>
					<Route
						path="/terms-of-service"
						element={<div>Условия использования</div>}
					/>
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Rage>
			<Footer />
		</AppContent>
	);
};
