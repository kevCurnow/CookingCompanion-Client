import React, { Component } from 'react';
import logo from './logo.svg';
import Auth from './components/User/Auth';
import Splash from './components/Splash/Splash';
import './App.css';

interface IState {
  sessionToken: string | undefined | null
}

export default class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sessionToken: ""
    };
  };

  updateSessionToken = (newToken: string) => {
    localStorage.setItem("sessionToken", newToken);
    this.setState({ sessionToken: newToken })
    
  }

  componentDidMount() {
    if (localStorage.getItem("sessionToken")) {
      this.setState({ sessionToken: localStorage.getItem("sessionToken")});
    }
  }
  
  render() {
      const session = localStorage.getItem("sessionToken");
      return (
        <div className="App">
          <div id="main">
            <h1>Cooking Companion</h1>
            {!session ? (
              <Auth updateSessionToken={this.updateSessionToken} />
            ) : (
              <Splash />
            )}
          </div>
        </div>
      );
  }
}


