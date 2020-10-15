import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  TableRow,
  TableCell,
  Table,
  TableBody,
  List,
} from "@material-ui/core";

type AcceptedProps = {
  result: any;
};

interface IState {
  
}

export default class SpoonRecipeInstructions extends Component<
  AcceptedProps,
  IState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      
    };
  }

  

  displaySpoonInstructions = () => {
    // console.log(this.props.result.analyzedInstructions[0].steps);
    let instructionsArray = this.props.result.analyzedInstructions[0].steps;
    // console.log(instructionsArray);
    return instructionsArray.map((instruction: any) => {
      return (
        <ListItem key={instruction.number}>
          <ListItemText>
            {instruction.number}. {instruction.step}
          </ListItemText>
        </ListItem>
      );
    });
  };


  render() {
    return <List>{this.displaySpoonInstructions()}</List>
  }

  
}
