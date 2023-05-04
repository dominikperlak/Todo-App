import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <App.test.js />
  </React.StrictMode>,
  document.getElementById('root')
);
