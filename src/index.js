import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { config } from './helpers/firebase';
import firebase from 'firebase'

firebase.initializeApp(config)

ReactDOM.render(
  <Router>
    <App />
  </Router>
, document.getElementById('root'));