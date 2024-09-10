import * as yup from 'yup';

export const nameSchema = yup
	.string()
	.required('Имя обязательно для заполнения')
	.min(2, 'Имя должно быть не менее 2 символов')
	.max(10, 'Имя должно быть не более 10 символов');
