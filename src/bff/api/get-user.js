export const getUser = (emailToFind) =>
	fetch(`http://localhost:3008/users?email=${emailToFind}`).then(
		(loadedUser) => loadedUser.json(),
	);
