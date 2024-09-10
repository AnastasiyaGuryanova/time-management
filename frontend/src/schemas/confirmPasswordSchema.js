import * as yup from 'yup';

export const confirmPasswordSchema = yup
	.string()
	.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
	.required('Повтор пароля обязателен');
