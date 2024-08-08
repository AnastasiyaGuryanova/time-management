import { BASE_URL } from "../constants";

export const deleteSession = async (sessionId) =>
	fetch(`${BASE_URL}/sessions/${sessionId}`, {
		method: "DELETE",
	});
