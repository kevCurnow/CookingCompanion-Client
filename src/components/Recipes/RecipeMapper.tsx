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
import APIURL from "../../helpers/environment";

type AcceptedProps = {
    recipeArray: [];
};

interface IState {

}

export default class RecipeMapper extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            
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
                    <TableCell>{recipe.recipeName}</TableCell>
                    <TableCell>{recipe.readyInMinutes}</TableCell>
                    <TableCell>{recipe.servings}</TableCell>
                    <TableCell>{recipe.calories}</TableCell>
                    <TableCell>{recipe.ingredientList.length}</TableCell>
                    {/* Extra cell for delete/edit */}
                </TableRow>
            );
        });
    };

    render() {
        return (
            <div>
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
            </div>
        );
    }
}