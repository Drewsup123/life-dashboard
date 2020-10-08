import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import initializeApp from './FirebaseInit';
import { Provider } from 'react-redux';
import store from './store/store';
// CSS Imports
import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/themes/md-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import { Provider } from 'react-redux';

initializeApp();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

