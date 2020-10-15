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
    userToDelete: any;
    sessionToken: string;
    deleteModalOpen: boolean;
    handleDeleteClose: () => void;

};

interface IState {

}

export default class DeleteUserDialog extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {};
    }

    deleteUser = () => {
        let url = `${APIURL}/user/${this.props.userToDelete.id}`;
        fetch(url, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.sessionToken
            })
        }).then(() => {
            this.props.handleDeleteClose();
        })
    }

    render() {
        return (
            <Dialog open={this.props.deleteModalOpen} onClose={this.props.handleDeleteClose}>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.deleteUser}>Yes</Button>
                    <Button onClick={this.props.handleDeleteClose}>No</Button>
                </DialogActions>
            </Dialog>
        );
    }
}