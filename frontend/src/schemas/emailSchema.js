import * as yup from 'yup';

export const emailSchema = yup
	.string()
	.required('Email обязателен')
	.email('Неверный формат email')
	.matches(
		/^[\w@.-]+$/,
		'Неверный формат email. Допускаются только буквы, цифры и символы @ . -',
	);
