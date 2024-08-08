import { BASE_URL } from "../constants";

export const getSession = async (hash) =>
	fetch(`${BASE_URL}/sessions?hash=${hash}`)
		.then((loadedSession) => loadedSession.json())
		.then(([loadedSession]) => loadedSession);
