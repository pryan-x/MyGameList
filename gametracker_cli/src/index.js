import React from 'react';
import ReactDOM from 'react-dom';
import './css/shared/index.css';
//probably needs tobedeleted^
import './css/shared/Reset.css'
import './css/shared/Flex.css'
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
<Router>
    <App />
</Router>,
document.getElementById('root'));

 

