import React, { Component } from "react";
import { Link, Redirect, BrowserRouter as Router } from "react-router-dom";
import { Button } from "@material-ui/core";

type AcceptedProps = {
}

interface IState {
    welcomeMessage: string,
    goToRoute: string
}
class Splash extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            welcomeMessage: "Welcome to Cooking Companion! Up your cooking game to the next level with our multitude of recipes to learn, upload your own, and even create grocery lists!",
            goToRoute: ""
        };
    }

    

    render() {
        if(this.state.goToRoute !== "") {
            return <Redirect to={{
                pathname: `${this.state.goToRoute}`
            }}/>;
        };
        return (
            <div>
                <h1>{this.state.welcomeMessage}</h1>
                <Button onClick={(event) => {
                    this.setState({ goToRoute: "/login"});
                }}>
                Login/Signup
                </Button>
                <Button onClick={(event) => {
                    this.setState({ goToRoute: "/search"})
                }}>Search Recipes</Button>
            </div>
        );
    }
}

export default Splash;