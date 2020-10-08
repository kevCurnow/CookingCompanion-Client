import React, { Component } from "react";

interface IState {
    welcomeMessage: string
}
class Splash extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            welcomeMessage: "Welcome to Cooking Companion!"
        };
    }

    render() {
        return (
            <div>
                <h1>{this.state.welcomeMessage}</h1>
            </div>
        );
    }
}

export default Splash;