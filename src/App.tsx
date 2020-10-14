import React, { Component } from 'react';
import logo from './logo.svg';
import Auth from './components/User/Auth';
import Splash from './components/Splash/Splash';
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import SwitchController from './site/SwitchController';
import Navbar from './components/Navbar/Navbar';

interface IState {
  sessionToken: string,
  spoonID: number | undefined
  // isLoggedIn: boolean
}

export default class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sessionToken: "",
      spoonID: undefined
      // isLoggedIn: false
    };
  };

  updateSessionToken = (newToken: string) => {
    localStorage.setItem("sessionToken", newToken);
    this.setState({ sessionToken: newToken })
    
  }

  updateRecipeID = (newID: number) => {
    this.setState({ spoonID: newID})
  }

  // componentDidMount() {
  //   if (localStorage.getItem("sessionToken")) {
  //     this.setState({ sessionToken: localStorage.getItem("sessionToken")});
  //   }
  // }
  
  render() {
      const session = localStorage.getItem("sessionToken");
      return (
        <div className="App">
          <div id="main">
          <Router>
            <Navbar sessionToken={this.state.sessionToken} />
            
              <SwitchController 
                updateSessionToken={this.updateSessionToken}
                sessionToken={this.state.sessionToken}
                updateRecipeID={this.updateRecipeID}
                spoonID={this.state.spoonID}
                />
            </Router>
            {/* {!session ? (
              <Auth updateSessionToken={this.updateSessionToken} />
            ) : (
              <Splash loginComponentToggle={this.state.loginComponentToggle}/>
            )} */}
          </div>
        </div>
      );
  }
}


