import { nameSchema } from './nameSchema';
import { emailSchema } from './emailSchema';
import { passwordSchema } from './passwordSchema';
import { confirmPasswordSchema } from './confirmPasswordSchema';
import * as yup from 'yup';

export const registrationAndSettingsSchema = yup.object().shape({
	name: nameSchema,
	email: emailSchema,
	password: passwordSchema,
	confirmPassword: confirmPasswordSchema,
});
