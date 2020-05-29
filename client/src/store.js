import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './Reducers';

const initalState = {

};

const middlewares = [thunk];

const store = createStore(
    rootReducer,
    initalState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;