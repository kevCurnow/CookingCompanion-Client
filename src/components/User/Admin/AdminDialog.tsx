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
import { Redirect } from "react-router-dom";

type AcceptedProps = {
  userToEdit: any;
  sessionToken: string;
  modalOpen: boolean;
  handleClose: () => void;
};

interface IState {}

export default class AdminDialog extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {};
  }

  updateUserRole = () => {
    let url = `${APIURL}/user/${this.props.userToEdit.id}`;
    fetch(url, {
      method: "PUT",
      body: JSON.stringify({ "isAdmin": true }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken,
      }),
    }).then(() => {
      this.props.handleClose()
    });
  };

  render() {
    return (
      <Dialog open={this.props.modalOpen} onClose={this.props.handleClose}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to make this user an admin?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.updateUserRole}>Yes</Button>
          <Button onClick={this.props.handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
