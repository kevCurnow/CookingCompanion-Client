import React, {Component} from "react";
import APIURL from "../../../helpers/environment";

type AcceptedProps = {
    isAdmin: string
}

interface IState {
    adminMessage: string;
}

export default class Admin extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            adminMessage: ""
        }
    }

    componentDidMount() {
        console.log(this.props.isAdmin);
        localStorage.adminRole === "true" ? this.setState({ adminMessage: "Welcome Admin!"}) : this.setState({ adminMessage: "I'm sorry but this page is for administrators only"})
    }

    render() {
        return (
            <div>
                <h1>{this.state.adminMessage}</h1>
            </div>
        )
    }
}