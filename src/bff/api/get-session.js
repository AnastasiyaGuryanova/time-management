export const getSession = async (hash) =>
	fetch(`http://localhost:3008/sessions?hash=${hash}`)
		.then((loadedSession) => loadedSession.json())
		.then(([loadedSession]) => loadedSession);
