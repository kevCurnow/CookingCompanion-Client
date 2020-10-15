import React, { Component } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { AddBox, Delete } from "@material-ui/icons";
import APIURL from "../../../helpers/environment";
import AdminDialog from "./AdminDialog";
import DeleteUserDialog from "./DeleteUserDialog";

type AcceptedProps = {
  userArray: [];
  sessionToken: string;
};

interface IState {
  modalOpen: boolean,
  userToEdit: any,
  deleteModalOpen: boolean,
  userToDelete: any
}

export default class UserMapper extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      modalOpen: false,
      userToEdit: undefined,
      deleteModalOpen: false,
      userToDelete: undefined
    };
  }

  mapUsers = () => {
    return this.props.userArray.map((user: any) => {
      return (
        <TableRow key={user.id}>
          <TableCell component="th" scope="row">
            {user.id}
          </TableCell>
          <TableCell>{user.firstName}</TableCell>
          <TableCell>{user.lastName}</TableCell>
          <TableCell>{user.userName}</TableCell>
          {user.isAdmin.toString() === "false" ? (
            <TableCell>
              {
                <Link
                  component="button"
                  onClick={() => {
                    this.handleOpen(user);
                  }}
                >
                  {user.isAdmin.toString()}
                </Link>
              }
            </TableCell>
          ) : (
            <TableCell>{user.isAdmin.toString()}</TableCell>
          )}
          {user.isAdmin.toString() === "false" ? (<TableCell><Delete onClick={() => {this.handleDeleteOpen(user)}}/></TableCell>) : null}
        </TableRow>
      );
    });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleDeleteClose = () => {
    this.setState({ deleteModalOpen: false});
  }

  handleOpen = (user: any) => {
    this.setState({ modalOpen: true })
    this.setState({userToEdit: user})
  };

  handleDeleteOpen = (user: any) => {
    this.setState({ deleteModalOpen: true})
    this.setState({ userToDelete: user})
  }

  render() {
    return (
      <div>
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
          <TableBody>{this.mapUsers()}</TableBody>
        </Table>
        <AdminDialog
          modalOpen={this.state.modalOpen}
          userToEdit={this.state.userToEdit}
          sessionToken={this.props.sessionToken}
          handleClose={this.handleClose}
        />
        <DeleteUserDialog 
        deleteModalOpen={this.state.deleteModalOpen}
        userToDelete={this.state.userToDelete}
        sessionToken={this.props.sessionToken}
        handleDeleteClose={this.handleDeleteClose}
        />
      </div>
    );
  }
}
