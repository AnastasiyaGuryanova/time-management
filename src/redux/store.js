import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { userReduser } from "@redusers";

const reduser = combineReducers({
	user: userReduser,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reduser,
	composeEnhancers(applyMiddleware(thunk)),
);
