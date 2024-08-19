import { addUser, getUser, updateUser } from '../api';
import { sessions } from '../sessions';

export const saveUser = async (hash, newName, newEmail, newPassword) => {
	let currentUser;
	let newHash = hash;

	if (hash) {
		const { user, id } = await sessions.access(hash);

		if (newEmail !== user.email) {
			const existedUser = await getUser(newEmail);

			if (existedUser) {
				return {
					error: 'Такой email уже занят',
					res: null,
				};
			}
		}

		currentUser = await updateUser({
			id: user.id,
			name: newName || user.name,
			email: newEmail || user.email,
			password: newPassword || user.password,
		});

		sessions.update(hash, id, {
			name: currentUser.name,
			email: currentUser.email,
			password: currentUser.password,
		});
	} else {
		const existedUser = await getUser(newEmail);

		if (existedUser) {
			return {
				error: 'Такой email уже занят',
				res: null,
			};
		}

		currentUser = await addUser(newName, newEmail, newPassword);
		newHash = sessions.create(currentUser);
	}

	console.log(currentUser);

	return {
		error: null,
		res: {
			id: currentUser.id,
			name: currentUser.name,
			email: currentUser.email,
			roleId: currentUser.role_id,
			createdAt: currentUser.created_at,
			updatedAt: currentUser.updated_at,
			session: newHash,
		},
	};
};
