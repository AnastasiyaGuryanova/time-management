import { transformUser } from "../transform-user";
import { BASE_URL } from "../constants";

export const getUser = async (emailToFind) =>
	fetch(`${BASE_URL}/users?email=${emailToFind}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser && transformUser(loadedUser));
