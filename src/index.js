import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
ReactDOM.render(
  //react router 사용하기 위해 취상단을 BrowserRouter로 감싸기
  <BrowserRouter> 
    <Main />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
