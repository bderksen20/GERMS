import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GroupPage from './GroupPage';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={App} />
      <Route exact path="/group" component={GroupPage} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
