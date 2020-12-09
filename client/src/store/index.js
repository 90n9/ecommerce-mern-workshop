import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from "../reducers";
import rootSaga from "../sagas";

const history = createBrowserHistory();


const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routeMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
	const store = createStore(
		createRootReducer(history),
		preloadedState,
		composeEnhancers(applyMiddleware(...middlewares))
	);
	sagaMiddleware.run(rootSaga);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept("../reducers/index", () => {
			const nextRootReducer = require("../reducers");
			store.replaceReducer(nextRootReducer(history));
		});
	}
	return store;
}

export { history };