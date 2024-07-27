import { BASE_URL } from "../constants";
import { getCurrentDateTime } from "../utils";

export const addUser = (name, email, password) =>
	fetch(`${BASE_URL}/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name,
			email,
			password,
			role_id: 1,
			created_at: getCurrentDateTime(),
			updated_at: getCurrentDateTime(),
		}),
	});
