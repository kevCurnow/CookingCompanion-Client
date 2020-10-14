import React, { Component } from "react";
import APIURL from '../../helpers/environment';
import { Redirect, BrowserRouter as Router } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";

type AcceptedProps = {
  updateSessionToken: (newToken: string) => void;
  sessionToken: string;
  isAdmin: string;
  adminVerification: (adminRole: string) => void;
}

interface IState {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
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
      loginToggle: true
    };
  }

  registerFields = () => this.state.loginToggle.toString() === "false" ? (
        <div>
        <TextField
          type="text"
          label="First Name"
          onChange={(event) => {
            this.setState({ firstName: event.target.value });
          }}
        />
        <br />
        <TextField
          type="text"
          label="Last Name"
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
      isAdmin: "false"
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
      console.log(data.user.isAdmin);
      this.props.updateSessionToken(data.sessionToken);
      this.props.adminVerification(data.user.isAdmin);
      
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
          <TextField
            type="text"
            label="UserName"
            onChange={(event) => {
              this.setState({ userName: event.target.value });
            }}
          />
          <br />
          <TextField
            type="text"
            label="Password"
            onChange={(event) => {
              this.setState({ password: event.target.value });
            }}
          />
          {this.state.loginToggle ?
          <Button onClick={this.toggleLogin}>Don't have an account yet? Click here to register</Button> : null}
          <br />
          <Button type="submit" color="primary">{this.state.loginToggle ? 'Log In' : 'Create Account'}</Button>
          {/* <h3>{this.state.loginToggle.toString()}</h3> */}
        </form>
      </div>
    );
  }
}

export default Auth;
