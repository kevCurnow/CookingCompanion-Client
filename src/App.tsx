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
  isAdmin: string
  userID: number | undefined
  savedID: number | undefined
}

export default class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sessionToken: "",
      spoonID: undefined,
      isAdmin: "false",
      userID: undefined,
      savedID: undefined
    };
  };

  componentDidUpdate() {
    console.log(`Current user is an admin: ${localStorage.getItem("adminRole")}`);
  }

  updateSessionToken = (newToken: string) => {
    localStorage.setItem("sessionToken", newToken);
    this.setState({ sessionToken: newToken })
    
  }

  updateRecipeID = (newID: number) => {
    this.setState({ spoonID: newID})
  }

  updateUserID = (newID: number) => {
    this.setState({ userID: newID})
  }

  updateSavedID = (newID: number) => {
    this.setState({ savedID: newID})
  }

  adminVerification = (adminString: string) => {
    if (adminString !== null) {
       this.setState({ isAdmin: adminString})
       localStorage.setItem("adminRole", adminString)
    } else {
      this.setState({ isAdmin: "false"});
      localStorage.setItem("adminRole", "false")
    }
    
  }

  logout = () => {
    localStorage.clear();
    this.setState({ sessionToken: "", isAdmin: "false"});
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
            <Navbar sessionToken={this.state.sessionToken} logout={this.logout}/>
            
              <SwitchController 
                updateSessionToken={this.updateSessionToken}
                sessionToken={this.state.sessionToken}
                updateRecipeID={this.updateRecipeID}
                spoonID={this.state.spoonID}
                isAdmin={this.state.isAdmin}
                adminVerification={this.adminVerification}
                updateUserID={this.updateUserID}
                userID={this.state.userID}
                updateSavedID={this.updateSavedID}
                savedID ={this.state.savedID}
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


