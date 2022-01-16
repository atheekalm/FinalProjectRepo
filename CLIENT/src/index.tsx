import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../src/app/layout/style.css';
import App from './app/layout/App';
import { createBrowserHistory } from 'history';
import { store } from './features/test_redux/configureStore';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import Navbar from './app/layout/Navbar';

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <Navbar />
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
