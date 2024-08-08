import { useCallback } from "react";
import { useSelector } from "react-redux";
import { server } from "@server";
import { selectUserSession } from "@selectors";

export const useServerRequest = () => {
	const session = useSelector(selectUserSession);

	return useCallback(
		async (operation, ...params) => {
			const requiresSession =
				operation !== "register" &&
				operation !== "authorize" &&
				operation !== "fetchProject" &&
				operation !== "removeProject";

			const requestParams = requiresSession
				? [session, ...params]
				: params;

			return server[operation](...requestParams);
		},
		[session],
	);
};
