import React, { Component } from "react";
import { Link, Redirect, BrowserRouter as Router } from "react-router-dom";

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
                <button onClick={(event) => {
                    this.setState({ goToRoute: "/auth"});
                }}>
                Login/Signup
                </button>
                <button onClick={(event) => {
                    this.setState({ goToRoute: "/search"})
                }}>Search Recipes</button>
            </div>
        );
    }
}

export default Splash;