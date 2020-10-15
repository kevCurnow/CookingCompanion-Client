import React, { Component } from "react";
import APIURL from '../../helpers/environment';
import { Redirect, BrowserRouter as Router, Link } from "react-router-dom";
import { TextField, Button, FormControl } from "@material-ui/core";

type AcceptedProps = {
  updateSessionToken: (newToken: string) => void;
  sessionToken: string;
  isAdmin: string;
  adminVerification: (adminRole: string) => void;
  updateUserID: (newID: number) => void;
}

interface IState {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  
}

class SignUp extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
    };
  }


  handleSubmit = (event: React.FormEvent<any>) => {
    event.preventDefault();
    let url = `${APIURL}/user/signup`
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
      this.props.updateUserID(data.user.id);
      console.log(this.props.sessionToken);
    })
    
    .catch(err => console.log(err))

  }

  toggleLogin = (event: React.FormEvent<any>) => {
    event.preventDefault();
    this.setState({ firstName: ''});
    this.setState({ lastName: ''});
    this.setState({ userName: ''});
    this.setState({ password: ''});

  }

  render() {
    if(this.props.sessionToken !== "") {
      return <Link to="/home" />;
    };
    return (
      <div>
        <FormControl >
          <TextField
            type="text"
            label="UserName"
            onChange={(event) => {
              this.setState({ userName: event.target.value });
            }}
          />
          <TextField
            type="password"
            label="Password"
            onChange={(event) => {
              this.setState({ password: event.target.value });
            }}
          />
          <TextField
          type="text"
          label="First Name"
          onChange={(event) => {
            this.setState({ firstName: event.target.value });
          }}
        />
        
        <TextField
          type="text"
          label="Last Name"
          onChange={(event) => {
            this.setState({ lastName: event.target.value });
          }}
        />
          <Button onClick={(e) => this.handleSubmit(e)} color="primary">Create Account</Button>
          {/* <h3>{this.state.loginToggle.toString()}</h3> */}
        </FormControl>
      </div>
    );
  }
}

export default SignUp;
