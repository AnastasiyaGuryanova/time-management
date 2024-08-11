import { useCallback } from "react";
import { useSelector } from "react-redux";
import { server } from "@server";
import { selectUserSession } from "@selectors";

export const useServerRequest = () => {
	const session = useSelector(selectUserSession);

	return useCallback(
		(operation, ...params) => {
			if (server[operation].length > params.length) {
				return server[operation](session, ...params);
			}

			return server[operation](...params);
		},
		[session],
	);
};
