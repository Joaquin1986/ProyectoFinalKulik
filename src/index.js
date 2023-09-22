import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBeg2iAQbcLZxFsLK6LGphg5W1Ftg_3ZuM",
  authDomain: "coderhouse-k.firebaseapp.com",
  projectId: "coderhouse-k",
  storageBucket: "coderhouse-k.appspot.com",
  messagingSenderId: "707875112411",
  appId: "1:707875112411:web:499f21ea8ba6122910d3fe"
};

// Se inicializa Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
