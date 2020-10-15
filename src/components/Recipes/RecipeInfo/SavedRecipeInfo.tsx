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
  Container,
  Button,
} from "@material-ui/core";

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import RecipeRemoveDialog from "./RecipeRemoveDialog";


type AcceptedProps = {
  result: any;
  sessionToken: string;
};

interface IState {
  modalOpen: boolean;
  recipeToRemove: any
}

export default class SavedRecipeInfo extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            modalOpen: false,
            recipeToRemove: undefined
        };
    }
    displaySavedInfo = () => {
        return (
            <div>
                <h1>{this.props.result.recipeName}</h1>
                <Container>
                <Button onClick={() => {this.handleOpen()} }>Remove Recipe</Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><h3>Cook Time in Minutes</h3></TableCell>
                            <TableCell align="center"><h3>Number of Servings</h3></TableCell>
                            <TableCell align="center"><h3>Calories per Serving</h3></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center"><h3>{this.props.result.readyInMinutes.toString()}</h3></TableCell>
                            <TableCell align="center"><h3>{this.props.result.servings.toString()}</h3></TableCell>
                            <TableCell align="center"><h3>{this.props.result.calories.toString()}</h3></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </Container>
            </div>
        )
    }

    handleOpen = () => {
        this.setState({ modalOpen: true})
        this.setState({ recipeToRemove: this.props.result})
    }

    handleClose = () => {
        this.setState({ modalOpen: false});
    }

    render() {
        return(
            <div>
                {this.displaySavedInfo()}
                <RecipeRemoveDialog 
                    modalOpen={this.state.modalOpen}
                    recipeToRemove={this.state.recipeToRemove}
                    handleClose={this.handleClose}
                    sessionToken={this.props.sessionToken}
                />

            </div>
            
        ) 
    }
}