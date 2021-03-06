import React from 'react';
import {Route} from 'react-router-dom';
import App from './App';
import SignInSide from './SignInSide';
import SignUp from './SignUp';
function Main() {
  return (
    //Route간단 사용법
    // <Route path = "A" component = "B" >
    // 해당 'A' path로 왔을때 B component를 띄우겠다.
    <>
        <Route path = "/" component ={SignInSide} exact/>
        <Route path = "/App/:categoryname" component ={App} exact/>
        <Route path = "/SignUp" component ={SignUp} />
    </>      
  );
}

export default Main;