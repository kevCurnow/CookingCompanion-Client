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
    recipeToRemove: any;
    modalOpen: boolean;
    handleClose: () => void;
    sessionToken: string;
}

interface IState {
    
}

export default class RecipeRemoveDialog extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {};
    }

    removeRecipe = () => {
        let url = `${APIURL}/recipe/${this.props.recipeToRemove.RecipeID}`
        fetch(url, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.sessionToken
            })
        }).then(() => {
            this.props.handleClose();
        })
        .then(() => {
            return (
                <Redirect to="/recipes" />
            )
        })
    }

    render() {
        return (
            <Dialog open={this.props.modalOpen} onClose={this.props.handleClose}>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove this recipe?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.removeRecipe}>Yes</Button>
                    <Button onClick={this.props.handleClose}>No</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

