import { useLayoutEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Header, PrivateRoute, Footer } from "@components";
import {
	Authorization,
	Registration,
	AllProjectsPage,
	NewProject,
	Project,
} from "@pages";
import { setUser } from "@actions";
import styled from "styled-components";

const AppContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	min-height: 100%;
	margin: 0 auto;
	background-color: ${(props) => props.theme.colors.pageBackground};
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

			<Routes>
				<Route path="/login" element={<Authorization />} />
				<Route path="/register" element={<Registration />} />

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
							<AllProjectsPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/project/new"
					element={
						<PrivateRoute>
							<NewProject />
						</PrivateRoute>
					}
				/>

				<Route
					path="/project/:id"
					element={
						<PrivateRoute>
							<Project />
						</PrivateRoute>
					}
				/>
				<Route
					path="/project/:id/tasks"
					element={
						<PrivateRoute>
							<Project />
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

			<Footer />
		</AppContent>
	);
};
