import React, {Component} from "react";
import APIURL from "../../../helpers/environment";
import UserTable from "./UserTable";

type AcceptedProps = {
    isAdmin: string;
    sessionToken: string;
}

interface IState {
    adminMessage: any;
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
        localStorage.adminRole === "true" ? this.setState({ adminMessage: <UserTable sessionToken={this.props.sessionToken} />}) : this.setState({ adminMessage: "I'm sorry but this page is for administrators only"})
    }

    render() {
        return (
            <div>
                {this.state.adminMessage}
            </div>
        )
    }
}