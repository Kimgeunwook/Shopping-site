// import React from 'react';
// import {Route} from 'react-router-dom';
// import App from './App';
// import SignInSide from './SignInSide';
// import SignUp from './SignUp';
// function Main() {
//   return (
//     <>
//         <Route path = "/" component ={SignInSide} exact/>
//         <Route path = "/App/:categoryname" component ={App} exact/>
//         <Route path = "/SignUp" component ={SignUp} />
//     </>      
//   );
// }

// export default Main;

import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username:null
        };
    }
    componentDidMount() {
      fetch('/api/books')
          .then(res=>res.json())
          .then(data => console.log(data))
          .then(data => console.log('ssss'));
          // .then(data=>this.setState({username:data.username}));
  }

  render() {
    const {username} = this.state;
    return (
        <div className="App">
          {/* <header className="App-header">
            {username ? `Hello ${username}` : 'Hello World'}
          </header> */}
        </div>
    );
    ;
  }
}

export default App;