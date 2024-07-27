import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, AuthFormError, StyledLink } from "@components";
import { server } from "@server";
import { setUser } from "@actions";
import { selectUserRole } from "@selectors";
import { ROLE } from "@constants";
import styled from "styled-components";

const regFormSchema = yup.object().shape({
	name: yup
		.string()
		.required("Имя обязательно для заполнения")
		.min(2, "Имя должно быть не менее 2 символов")
		.max(10, "Имя должно быть не более 10 символов"),
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
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Пароли не совпадают")
		.required("Повтор пароля обязателен"),
});

const RegisterContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const submitButtonRef = React.useRef(null);

	const focusSubmitButton = () => {
		if (isValid && submitButtonRef.current) {
			submitButtonRef.current.focus();
		}
	};

	const onSubmit = ({ name, email, password }) => {
		server.register(name, email, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
			sessionStorage.setItem("userData", JSON.stringify(res));
		});

		reset({
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
	};

	const formError =
		errors?.name?.message ||
		errors?.email?.message ||
		errors?.password?.message ||
		errors?.confirmPassword?.message;

	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<div className="container">
				<h2 className="title">Регистрация</h2>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label>Имя:</label>

						<Input
							name="name"
							type="name"
							placeholder="Имя..."
							width={"550px"}
							{...register("name", {
								onChange: () => setServerError(null),
							})}
							onBlur={focusSubmitButton}
						/>
					</div>
					<div>
						<label>Email:</label>

						<Input
							name="email"
							type="email"
							placeholder="Email..."
							width={"550px"}
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
							width={"550px"}
							{...register("password", {
								onChange: () => setServerError(null),
							})}
							onBlur={focusSubmitButton}
						/>
					</div>
					<div>
						<label>Повторите пароль:</label>

						<Input
							name="confirmPassword"
							type="password"
							placeholder="Повтор пароля..."
							width={"550px"}
							{...register("confirmPassword", {
								onChange: () => setServerError(null),
							})}
							onBlur={focusSubmitButton}
						/>
					</div>
					<Button type="submit" ref={submitButtonRef}>
						Зарегистрироваться
					</Button>

					<StyledLink to="/login">Авторизация</StyledLink>

					{errorMessage && (
						<AuthFormError>{"*" + errorMessage}</AuthFormError>
					)}
				</form>
			</div>
		</div>
	);
};

export const Register = styled(RegisterContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${(props) => props.theme.colors.pageText};

	& .container {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 650px;
		height: 650px;
		padding: 40px;
		border-radius: 7px;
		border: 1px solid ${(props) => props.theme.colors.inputBorderColor};
	}

	& .title {
		margin: 0 0 20px;
		font-size: 34px;
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
