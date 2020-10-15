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

export default class SavedRecipeInstructions extends Component<
  AcceptedProps,
  IState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      
    };
  }

  // componentDidMount() {
  //   this.setState({functionToCall: (this.props.spoonID !== undefined ? this.displaySpoonInstructions() : this.displaySavedInstructions())})
    
  // }
  

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
    return <List>{this.displaySavedInstructions()}</List>
  }

  
}
