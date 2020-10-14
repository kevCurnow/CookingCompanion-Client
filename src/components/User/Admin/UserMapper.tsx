import React, {Component} from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {AddBox, Delete} from '@material-ui/icons';
import { Link } from 'react-router-dom';

type AcceptedProps = {
    userArray: []
} 

interface IState {

}

export default class UserMapper extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {

        }
    }

    mapUsers = () => {
        return this.props.userArray.map((user: any) => {
            return (
                    <TableRow key = {user.id}>
                    <TableCell component="th" scope="row">
                        {user.id}
                    </TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.isAdmin.toString()}</TableCell>
                </TableRow>
                
                
            )
        })
    }

    render() {
        return(
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>User Name</TableCell>
                        <TableCell>Admin Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.mapUsers()}
                </TableBody>
            </Table>
        )
    }
}