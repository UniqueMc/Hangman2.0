import React from 'react';
import ReactDOM from 'react-dom/client';
import HangmanGame from './HangmanGame';
import './App.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HangmanGame />
  </React.StrictMode>
);
