import { emailSchema } from './emailSchema';
import { passwordSchema } from './passwordSchema';
import * as yup from 'yup';

export const authSchema = yup.object().shape({
	email: emailSchema,
	password: passwordSchema,
});
