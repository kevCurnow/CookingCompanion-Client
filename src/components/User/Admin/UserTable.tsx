import React, {Component} from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {AddBox, Delete} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import APIURL from '../../../helpers/environment';
import UserMapper from './UserMapper';

type AcceptedProps = {
    sessionToken: string
}

interface IState {
    users: [],
    usersFetched: boolean
}

export default class UserTable extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            users: [],
            usersFetched: false
        }
    }
    fetchUsers = () => {
        let url = `${APIURL}/user/admin`
        fetch(url, {
            method: 'GET',
            headers: new Headers({ 
                'Content-Type': 'application/json',
                'authorization': `${this.props.sessionToken}`
            })
        })
        .then(res => res.json())
        .then(results => {
            this.setState({ users: results.users})
    })
        .then(() => this.setState({usersFetched: true}))
    }

    

    componentDidMount() {
        this.fetchUsers();
    }

    render() {
        return(
            <div>
                {this.state.usersFetched ? <UserMapper userArray={this.state.users} /> : null}
            </div>
        )
    }
}