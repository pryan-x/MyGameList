import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
//probably needs tobedeleted^
import './css/Reset.css'
import './css/Flex.css'
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
<Router>
    <App />
</Router>,
document.getElementById('root'));

 

