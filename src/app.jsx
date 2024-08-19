import { useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from 'chart.js';
import { BackArrow, Header, PrivateRoute, Footer, Modal } from '@components';
import {
	Analytics,
	Authorization,
	Registration,
	AllProjectsPage,
	NewProject,
	Project,
	SettingsPage,
} from '@pages';
import { setUser, setTheme } from '@actions';
import { selectTheme } from '@selectors';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
);

const AppContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: relative;
	width: 100%;
	min-height: 100%;
	margin: 0 auto;
	background-color: ${(props) => props.theme.colors.pageBackground};
`;

export const App = () => {
	const dispatch = useDispatch();
	const currentTheme = useSelector(selectTheme);

	useLayoutEffect(() => {
		const savedThemeJSON = localStorage.getItem('appTheme');

		if (savedThemeJSON) {
			const savedTheme = JSON.parse(savedThemeJSON);
			dispatch(setTheme(savedTheme));
		}

		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) return;

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
			}),
		);
	}, [dispatch]);

	return (
		<ThemeProvider theme={currentTheme}>
			<AppContent>
				<Header />
				<BackArrow />

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
								<Analytics />
							</PrivateRoute>
						}
					/>
					<Route
						path="/settings"
						element={
							<PrivateRoute>
								<SettingsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/settings/user-edit"
						element={
							<PrivateRoute>
								<SettingsPage />
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
				<Modal />
			</AppContent>
		</ThemeProvider>
	);
};
