import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import initializeApp from './FirebaseInit';
// CSS Imports
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import { Provider } from 'react-redux';

initializeApp();

ReactDOM.render(
  // <Provider store={null}>
    <Router>
      <App />
    </Router>,
  document.getElementById('root')
);

