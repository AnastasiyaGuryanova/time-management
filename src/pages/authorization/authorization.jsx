import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, AuthFormError, StyledLink, H2, PageComponent } from '@components';
import { useServerRequest } from '@hooks';
import { authSchema } from '@schemas';
import { setUser } from '@actions';
import { selectUserRole } from '@selectors';
import { ROLE } from '@constants';
import styled from 'styled-components';

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(authSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const submitButtonRef = useRef(null);
	const requestServer = useServerRequest();

	const focusSubmitButton = () => {
		if (isValid && submitButtonRef.current) {
			submitButtonRef.current.focus();
		}
	};

	const onSubmit = ({ email, password }) => {
		requestServer('authorize', email, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
			sessionStorage.setItem('userData', JSON.stringify(res));
		});

		reset({
			email: '',
			password: '',
		});
	};

	const formError = errors?.email?.message || errors?.password?.message;

	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<PageComponent className={className}>
			<div className="container">
				<H2>Вход в аккаунт</H2>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label>Email:</label>

						<Input
							name="email"
							type="email"
							placeholder="Email..."
							margin="0 0 10px 0"
							width="550px"
							{...register('email', {
								onChange: () => setServerError(null),
							})}
							onBlur={focusSubmitButton}
						/>
					</div>
					<div>
						<label>Пароль:</label>

						<Input
							name="password"
							type="password"
							placeholder="Пароль..."
							margin="0 0 10px 0"
							width="550px"
							{...register('password', {
								onChange: () => setServerError(null),
							})}
							onBlur={focusSubmitButton}
						/>
					</div>
					<Button
						type="submit"
						ref={submitButtonRef}
						onBlur={focusSubmitButton}
					>
						Авторизоваться
					</Button>

					<StyledLink to="/register">Регистрация</StyledLink>

					{errorMessage && <AuthFormError>{'*' + errorMessage}</AuthFormError>}
				</form>
			</div>
		</PageComponent>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	& .container {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 650px;
		height: 490px;
		padding: 40px;
		border-radius: 7px;
		border: 1px solid ${(props) => props.theme.colors.borderColor};
	}

	& form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	& label {
		font-size: 18px;
		font-weight: 500;
		letter-spacing: 1px;
	}

	& input {
		margin: 10px 0 20px 0;
	}
`;
