import React, {Component} from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {AddBox} from '@material-ui/icons';
import { Link } from 'react-router-dom';

type passedProps = {
    results: [],
    sessionToken: string,
    updateRecipeID: (newID: number) => void;
    spoonID: number | undefined;
}
interface IState {

}

export default class RecipeSearchDisplay extends Component<passedProps, IState> {
    constructor(props: passedProps) {
        super(props);
        this.state = {}
    }
    handleRecipe = (event: React.FormEvent<HTMLElement>, recipeID: number) => {
        event.preventDefault();
        this.props.updateRecipeID(recipeID);
    }

    recipeMapper = () => {
        return this.props.results.map((recipe: any) => {
            return (
                <TableRow key = {recipe.id}>
                    <TableCell component="th" scope="row">
                    {recipe.id}
                    </TableCell>
                    <TableCell><Button onClick={(e) => this.handleRecipe(e, recipe.id)}><Link to="/recipe">{recipe.title}</Link></Button></TableCell>
                    <TableCell>{recipe.readyInMinutes}</TableCell>
                    <TableCell>{recipe.servings}</TableCell>
                    <TableCell>{recipe.nutrition.nutrients[0].amount}</TableCell>
                    <TableCell>{recipe.extendedIngredients.length}</TableCell>
                    {this.props.sessionToken !== "" ? (<TableCell><AddBox /></TableCell>) : null}
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
                        {this.props.sessionToken !== "" ? (<TableCell>Save Recipe</TableCell>): null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.recipeMapper()}
                </TableBody>
            </Table>
        )
    }
}


