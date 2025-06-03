import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import { store } from './store/index.ts';

import { BrowserRouter as Router } from "react-router-dom";  // Import Router here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>   {/* Wrap App with Router here */}
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();