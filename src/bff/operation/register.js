import { getUser } from "@api";
import { sessions } from "@sessions";

export const register = async (regEmail, regName, regPassword) => {
	const existedUser = await getUser(regEmail);

	if (existedUser) {
		return {
			error: "Такой аккаунт уже занят",
			res: null,
		};
	}

	const user = addUser(regName, regEmail, regPassword);

	return {
		error: null,
		res: {
			id: user.id,
			name: user.name,
			email: user.email,
			session: sessions.create(user),
		},
	};
};
