import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'

import App from './components/App.jsx';

render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
  , document.getElementById( 'react-container' ));
