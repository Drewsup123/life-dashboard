import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import initializeApp from './FirebaseInit';
// import { Provider } from 'react-redux';

initializeApp();

ReactDOM.render(
  // <Provider store={null}>
  <Provider theme={defaultTheme}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

