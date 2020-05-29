import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <App />
);

ReactDOM.render(app, document.getElementById('root'));
