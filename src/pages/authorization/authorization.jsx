import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, AuthFormError, StyledLink, H2 } from "@components";
import { useServerRequest } from "@hooks";
import { setUser } from "@actions";
import { selectUserRole } from "@selectors";
import { ROLE } from "@constants";
import styled from "styled-components";

const authFormSchema = yup.object().shape({
	email: yup
		.string()
		.required("Email обязателен")
		.email("Неверный формат email")
		.matches(
			/^[\w@.-]+$/,
			"Неверный формат email. Допускаются только буквы, цифры и символы @ . -",
		),
	password: yup
		.string()
		.required("Пароль обязателен")
		.matches(
			/^[\w#%]+$/,
			"Неверно заполнен пароль. Допускаются  буквы, цифры и знаки # %.",
		)
		.min(6, "Неверно заполнен пароль. Минимум 6 символа")
		.max(30, "Неверно заполнен пароль. Максимум 30 символов"),
});

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const submitButtonRef = React.useRef(null);
	const requestServer = useServerRequest();

	const focusSubmitButton = () => {
		if (isValid && submitButtonRef.current) {
			submitButtonRef.current.focus();
		}
	};

	const onSubmit = ({ email, password }) => {
		requestServer("authorize", email, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
			sessionStorage.setItem("userData", JSON.stringify(res));
		});

		reset({
			email: "",
			password: "",
		});
	};

	const formError = errors?.email?.message || errors?.password?.message;

	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<div className="container">
				<H2>Вход в аккаунт</H2>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label>Email:</label>

						<Input
							name="email"
							type="email"
							placeholder="Email..."
							width="550px"
							{...register("email", {
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
							width="550px"
							{...register("password", {
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

					{errorMessage && (
						<AuthFormError>{"*" + errorMessage}</AuthFormError>
					)}
				</form>
			</div>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 50px 0;
	color: ${(props) => props.theme.colors.pageText};

	& .container {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 650px;
		height: 470px;
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

	& button:active {
		background-color: ${(props) => props.theme.colors.pageActiveColor};
	}
`;
