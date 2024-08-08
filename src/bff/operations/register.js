import { addUser, getUser } from "../api";
import { sessions } from "../sessions";

export const register = async (regName, regEmail, regPassword) => {
	const existedUser = await getUser(regEmail);

	if (existedUser) {
		return {
			error: "Такой email уже занят",
			res: null,
		};
	}

	const user = await addUser(regName, regEmail, regPassword);

	return {
		error: null,
		res: {
			id: user.id,
			name: user.name,
			email: user.email,
			roleId: user.role_id,
			createdAt: user.created_at,
			updatedAt: user.updated_at,
			session: sessions.create(user),
		},
	};
};
