import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, AuthFormError, StyledLink } from '@components';
import { setUser } from '@actions';
import { useServerRequest } from '@hooks';
import { registrationAndSettingsSchema } from '@schemas';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const UserFormContainer = ({
	defaultValues,
	submitButtonText,
	onSuccess,
	isEdit,
	className,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		defaultValues,
		resolver: yupResolver(registrationAndSettingsSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();
	const submitButtonRef = useRef(null);

	const focusSubmitButton = () => {
		if (isValid && submitButtonRef.current) {
			submitButtonRef.current.focus();
		}
	};

	const onSubmit = async (data) => {
		const { name, email, password } = data;
		const { error, res } = await requestServer('saveUser', name, email, password);
		if (error) {
			setServerError(`Ошибка запроса: ${error}`);
			return;
		}

		dispatch(setUser(res));
		if (onSuccess) onSuccess();
		reset();
	};

	const formError =
		errors?.name?.message ||
		errors?.email?.message ||
		errors?.password?.message ||
		errors?.confirmPassword?.message;

	const errorMessage = formError || serverError;

	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label>Имя:</label>
				<Input
					name="name"
					type="text"
					placeholder="Имя..."
					{...register('name')}
					onBlur={focusSubmitButton}
				/>
			</div>
			<div>
				<label>Email:</label>
				<Input
					name="email"
					type="email"
					placeholder="Email..."
					{...register('email')}
					onBlur={focusSubmitButton}
				/>
			</div>
			<div>
				<label>Пароль:</label>
				<Input
					name="password"
					type="password"
					placeholder="Пароль..."
					{...register('password')}
					onBlur={focusSubmitButton}
				/>
			</div>
			<div>
				<label>Повторите пароль:</label>
				<Input
					name="confirmPassword"
					type="password"
					placeholder="Повтор пароля..."
					{...register('confirmPassword')}
					onBlur={focusSubmitButton}
				/>
			</div>
			<div className="buttons">
				<Button type="submit">{submitButtonText}</Button>

				{isEdit && (
					<Button
						margin="0 0 0 20px"
						type="button"
						onClick={() => navigate('/settings')}
					>
						Отменить
					</Button>
				)}
			</div>

			{!isEdit && <StyledLink to="/login">Авторизация</StyledLink>}

			{errorMessage && <AuthFormError>{'*' + errorMessage}</AuthFormError>}
		</form>
	);
};

export const UserForm = styled(UserFormContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	& div {
		width: 100%;
	}

	& label {
		font-size: 18px;
		font-weight: 500;
		letter-spacing: 1px;
	}

	& input {
		margin: 10px 0 20px 0;
	}

	& .buttons {
		display: flex;
		justify-content: center;
	}
`;
