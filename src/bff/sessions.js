import { addSession, getSession, deleteSession, updateSession } from './api';

export const sessions = {
	create(user) {
		const hash = Math.random().toFixed(50);

		addSession(hash, user);

		return hash;
	},

	async remove(hash) {
		const session = await getSession(hash);

		if (!session) {
			return;
		}

		deleteSession(session.id);
	},

	async access(hash) {
		const dbSession = await getSession(hash);
		return dbSession;
	},

	async update(hash, id, newUserData) {
		const session = await getSession(hash);

		if (!session) {
			throw new Error('Сессия не найдена');
		}

		const updatedUser = {
			...session.user,
			...newUserData,
		};

		await updateSession(id, updatedUser);

		return updatedUser;
	},
};
