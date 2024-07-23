import { getCurrentDateTime } from "@utils";

export const addUser = (name, email, password) =>
	fetch("http://localhost:3008/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			name,
			email,
			password,
			created_at: getCurrentDateTime(),
		}),
	});
