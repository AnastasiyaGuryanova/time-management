import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { userReduser, projectReduser } from "@redusers";

const reduser = combineReducers({
	user: userReduser,
	project: projectReduser,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reduser,
	composeEnhancers(applyMiddleware(thunk)),
);
