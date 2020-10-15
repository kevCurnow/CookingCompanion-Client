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
  TextField,
} from "@material-ui/core";
import { AddBox, Delete } from "@material-ui/icons";
import APIURL from "../../../helpers/environment";
import { Redirect } from "react-router-dom";

type AcceptedProps = {
    editOpen: boolean;
    result: any;
    handleClose: () => void;
    sessionToken: string;
};

interface IState {
    newInstructions: string
}

export default class EditInstructionsDialog extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            newInstructions: ""
        };
    }

    submitNewInstructions = () => {
        let instructionArr = this.state.newInstructions.split("$");
        let url = `${APIURL}/recipe/${this.props.result.recipeID}`
        let instructionObject = {
            steps: instructionArr
        }
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(instructionObject),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
        .then(res => res.json())
        .then(() => {this.props.handleClose()})
        .catch(err => console.log(err))
    }

    render() {
        return (
            <Dialog open={this.props.editOpen} onClose={this.props.handleClose}>
                <DialogContent>
                    <DialogContentText>
                        Here are the existing instructions:
                    </DialogContentText>
                    <DialogContentText>
                        {this.props.result.steps}
                    </DialogContentText>
                    <DialogContentText>
                        Edit the instructions however you choose, just remember to put a $ between each one.
                    </DialogContentText>
                    <TextField multiline rows={10} variant="outlined" type="text" onChange={(e) => {
                        this.setState({ newInstructions: e.target.value})
                    }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.submitNewInstructions}>Update Instructions</Button>
                </DialogActions>
            </Dialog>
        )
    }
}