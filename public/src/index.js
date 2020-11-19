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

ReactDOM.render(<App />, document.getElementById('root'));

// ---------------- bootstrap -------------------
$(function () {
  $('.selectpicker').selectpicker();
});
// ---------------- bootstrap -------------------
