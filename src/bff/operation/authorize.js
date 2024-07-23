import { getUser } from "@api";
import { sessions } from "@sessions";

export const authorize = async (authEmail, authPassword) => {
	const user = await getUser(authEmail);

	if (!user) {
		return {
			error: "Такой пользователь не найден",
			res: null,
		};
	}

	const { id, name, email, password } = user;

	if (authPassword !== user.password) {
		return {
			error: "Неверный пароль",
			res: null,
		};
	}

	return {
		error: null,
		res: {
			id,
			name,
			email,
			password,
			session: sessions.create(user),
		},
	};
};
