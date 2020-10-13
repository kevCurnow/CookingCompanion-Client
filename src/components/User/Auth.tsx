import React, { Component } from "react";
import APIURL from '../../helpers/environment';
import { Redirect, BrowserRouter as Router } from "react-router-dom";

type AcceptedProps = {
  updateSessionToken: (newToken: string) => void;
  sessionToken: string;
}

interface IState {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  isAdmin: boolean;
  loginToggle: boolean;
}

class Auth extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      isAdmin: false,
      loginToggle: true
    };
  }

  registerFields = () => this.state.loginToggle.toString() === "false" ? (
        <div>
        <label htmlFor="firstName">First Name: </label>
        <br />
        <input
          type="text"
          className="firstName"
          onChange={(event) => {
            this.setState({ firstName: event.target.value });
          }}
        />
        <br />
        <label htmlFor="lastName">Last Name: </label>
        <br />
        <input
          type="text"
          className="lastName"
          onChange={(event) => {
            this.setState({ lastName: event.target.value });
          }}
        />
        <br />
        </div>
  ) : null

  handleSubmit = (event: React.FormEvent<any>) => {
    event.preventDefault();
    let url = this.state.loginToggle ? `${APIURL}/user/login` : `${APIURL}/user/signup`
    let userObject = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      password: this.state.password,
      isAdmin: this.state.isAdmin
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(userObject),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.props.updateSessionToken(data.sessionToken);
      console.log(this.props.sessionToken);
    })
    .catch(err => console.log(err))

  }

  toggleLogin = (event: React.FormEvent<any>) => {
    event.preventDefault();
    this.setState({ loginToggle: false});
    console.log(this.state.loginToggle);
    this.setState({ firstName: ''});
    this.setState({ lastName: ''});
    this.setState({ userName: ''});
    this.setState({ password: ''});
  }

  render() {
    if(this.props.sessionToken !== "") {
      return <Redirect to="/home" />;
    };
    return (
      
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          {this.registerFields()}
          <label htmlFor="userName">UserName: </label>
          <br />
          <input
            type="text"
            className="userName"
            onChange={(event) => {
              this.setState({ userName: event.target.value });
            }}
          />
          <br />
          <label htmlFor="password">Password: </label>
          <br />
          <input
            type="text"
            className="password"
            onChange={(event) => {
              this.setState({ password: event.target.value });
            }}
          />
          {this.state.loginToggle ?
          <button onClick={this.toggleLogin}>Don't have an account yet? Click here to register</button> : null}
          <br />
          <button type="submit" color="success">{this.state.loginToggle ? 'Log In' : 'Create Account'}</button>
          {/* <h3>{this.state.loginToggle.toString()}</h3> */}
        </form>
      </div>
    );
  }
}

export default Auth;
