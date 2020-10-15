import React, { Component } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { AddBox, Delete } from "@material-ui/icons";
import APIURL from "../../helpers/environment";
import RecipeCreate from "./RecipeCreate";
import { Link } from "react-router-dom";


type AcceptedProps = {
    recipeArray: [];
    sessionToken: string;
    updateSavedID: (newID: number) => void;
    savedID: number | undefined
};

interface IState {
    formOpen: boolean
}

export default class RecipeMapper extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            formOpen: false
        };
    }

    mapRecipes = () => {
        console.log(this.props.recipeArray);
        return this.props.recipeArray.map((recipe: any) => {
            return (
                <TableRow key={recipe.recipeID}>
                    <TableCell component="th" scope="row">
                        {recipe.recipeID}
                    </TableCell>
                    <TableCell><Button onClick={(e) => this.handleRecipe(e, recipe.recipeID)}><Link to="/recipe">{recipe.recipeName}</Link></Button></TableCell>
                    <TableCell>{recipe.readyInMinutes}</TableCell>
                    <TableCell>{recipe.servings}</TableCell>
                    <TableCell>{recipe.calories}</TableCell>
                    <TableCell>{recipe.ingredientList.length}</TableCell>
                    {/* Extra cell for delete/edit */}
                </TableRow>
            );
        });
    };
    handleRecipe = (event: React.FormEvent<HTMLElement>, recipeID: number) => {
        event.preventDefault();
        console.log(recipeID);
        this.props.updateSavedID(recipeID);
    }

    

    handleOpen = () => {
        this.setState({ formOpen: true })
    }

    handleClose = () => {
        this.setState({ formOpen: false})
    }

    render() {
        return (
            <div>
                <Button onClick={() => {this.handleOpen()}}><AddBox  /> Create Recipe </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Recipe #</TableCell>
                            <TableCell>Recipe Name</TableCell>
                            <TableCell>Cook Time in Minutes</TableCell>
                            <TableCell>Number of Servings</TableCell>
                            <TableCell>Calories per Serving</TableCell>
                            <TableCell>Number of Ingredients</TableCell>
                            {/* extra cell for delete/edit */}
                        </TableRow>
                    </TableHead>
                    <TableBody>{this.mapRecipes()}</TableBody>
                </Table>
                <RecipeCreate formOpen={this.state.formOpen} sessionToken={this.props.sessionToken} handleClose={this.handleClose} />
            </div>
        );
    }
}