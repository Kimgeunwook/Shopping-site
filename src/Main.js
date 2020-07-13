import React from 'react';
import {Route} from 'react-router-dom';
import App from './App';
import SignInSide from './SignInSide';
import SignUp from './SignUp';
function Main() {
  return (
    <>
        <Route path = "/" component ={SignInSide} exact/>
        <Route path = "/App/:categoryname" component ={App} exact/>
        <Route path = "/SignUp" component ={SignUp} />
    </>      
  );
}

export default Main;