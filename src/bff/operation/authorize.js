import { getUser } from "../api/get-user";
import { sessions } from "../sessions";

export const authorize = async (authEmail, authPassword) => {
	const user = await getUser(authEmail);

	if (!user) {
		return {
			error: "Такой пользователь не найден",
			res: null,
		};
	}

	const { id, name, email, password, roleId, createdAt, updatedAt } = user;

	if (authPassword !== password) {
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
			roleId,
			createdAt,
			updatedAt,
			session: sessions.create(user),
		},
	};
};
