// ---------------- bootstrap -------------------
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-select/dist/js/bootstrap-select.js';
// ---------------- bootstrap -------------------
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/style.css'; // my custom css
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// ---------------- bootstrap -------------------
$(function () {
  $('.selectpicker').selectpicker();
});
// ---------------- bootstrap -------------------

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
