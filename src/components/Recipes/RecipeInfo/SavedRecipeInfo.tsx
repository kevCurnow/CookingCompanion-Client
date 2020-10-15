import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  TableRow,
  TableCell,
  Table,
  TableBody,
  List,
  TableHead,
} from "@material-ui/core";

type AcceptedProps = {
  result: any;
};

interface IState {
  
}

export default class SavedRecipeInfo extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {

        };
    }

    displaySavedInfo = () => {
        return (
            <div>
                <h1>{this.props.result.recipeName}</h1>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Cook Time in Minutes</TableCell>
                            <TableCell>Number of Servings</TableCell>
                            <TableCell>Calories per Serving</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{this.props.result.readyInMinutes.toString()}</TableCell>
                            <TableCell>{this.props.result.servings.toString()}</TableCell>
                            <TableCell>{this.props.result.calories.toString()}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }

    render() {
        return(
            this.displaySavedInfo()
        ) 
    }
}