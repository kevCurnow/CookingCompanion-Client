import React, {Component} from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

type passedProps = {
    results: []
}
interface IState {

}

export default class RecipeSearchDisplay extends Component<passedProps, IState> {
    constructor(props: passedProps) {
        super(props);
        this.state = {}
    }
    recipeMapper = () => {
        return this.props.results.map((recipe: any) => {
            return (
                <TableRow key = {recipe.id}>
                    <TableCell component="th" scope="row">
                    {recipe.id}
                    </TableCell>
                    <TableCell>{recipe.title}</TableCell>
                    <TableCell>{recipe.readyInMinutes}</TableCell>
                    <TableCell>{recipe.servings}</TableCell>
                    <TableCell>{recipe.nutrition.nutrients[0].amount}</TableCell>
                    <TableCell>{recipe.extendedIngredients.length}</TableCell>
                </TableRow>
            );
        });
    };
    render() {
        return(
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Dish Name</TableCell>
                        <TableCell>Time to Cook in Minutes</TableCell>
                        <TableCell>Number of Servings</TableCell>
                        <TableCell>Calories per Serving</TableCell>
                        <TableCell>Number of Ingredients</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.recipeMapper()}
                </TableBody>
            </Table>
        )
    }
}


