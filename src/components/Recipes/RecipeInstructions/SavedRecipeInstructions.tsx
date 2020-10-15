import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  TableRow,
  TableCell,
  Table,
  TableBody,
  List,
  Dialog,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import EditInstructionsDialog from "./EditInstructionsDialog";

type AcceptedProps = {
  result: any;
  sessionToken: string
};

interface IState {
  editOpen: boolean
}

export default class SavedRecipeInstructions extends Component<
  AcceptedProps,
  IState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      editOpen: false
    };
  }

  // componentDidMount() {
  //   this.setState({functionToCall: (this.props.spoonID !== undefined ? this.displaySpoonInstructions() : this.displaySavedInstructions())})
    
  // }
  
  handleEdit = () => {
    this.setState({ editOpen: true})
  }

  handleClose = () => {
    this.setState({ editOpen: false})
  }

  displaySavedInstructions = () => {
      return this.props.result.steps.map((instruction: any, index: number) => {
          return (
              <ListItem key={index}>
                  <ListItemText>
                      {index + 1}. {instruction}
                  </ListItemText>
              </ListItem>
          );
      });
  };

  render() {
    return (
      <div>
    <h2>Instructions <Edit onClick={() => {this.handleEdit()}}/></h2>
    <List>{this.displaySavedInstructions()}</List> 
    <EditInstructionsDialog 
    editOpen={this.state.editOpen} result={this.props.result} handleClose={this.handleClose} sessionToken={this.props.sessionToken} /> </div>)

  }

  
}
