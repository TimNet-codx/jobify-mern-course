import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { ToastContainer } from 'react-toastify';
//import axios from 'axios';
//import customFetch from './utils/customFetch.js'

// fetch('http://localhost:5100/api/v1/test')
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// fetch('/api/v1/test')
//   .then((res) => res.json())
//   .then((data) => console.log(data));

  //const response = await axios.get('/api/v1/test');
  // const response = await customFetch('/test');
  // console.log(response);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer position='top-center'/>
  </React.StrictMode>
)
