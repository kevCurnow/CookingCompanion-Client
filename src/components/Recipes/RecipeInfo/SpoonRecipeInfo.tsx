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
  Button,
} from "@material-ui/core";
import APIURL from "../../../helpers/environment";

type AcceptedProps = {
    result: any;
    sessionToken: string
    userID: number | undefined
};

interface IState {

}

export default class SpoonRecipeInfo extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {

        };
    }

    saveRecipe = () => {
        let recipe = this.props.result;
        let url = `${APIURL}/recipe/${recipe.id}`
        let ingredientArray: any[] = new Array;
        recipe.extendedIngredients.forEach((ingredient: { originalString: any; }) => ingredientArray.push(ingredient.originalString))
        let stepArray = [];
        stepArray = (recipe.instructions.split("\n"));
        let recipeObject = {
            recipeName: recipe.title,
            servings: recipe.servings,
            readyInMinutes: recipe.readyInMinutes,
            ingredientList: ingredientArray,
            steps: stepArray,
            calories: recipe.nutrition.nutrients[0].amount,
            userID: this.props.userID
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(recipeObject),
            headers: new Headers({
                'Content-Type': 'application/json',
                "Authorization": this.props.sessionToken
            })
        })
        .then( res => res.json())
        .catch(err => console.log(err))
    }

    displaySpoonInfo = () => {
        return (
            <div>
                <h1>{this.props.result.title}</h1>
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
                            <TableCell>{this.props.result.nutrients[0].amount.toString()}</TableCell>
                        </TableRow>
                        {this.props.sessionToken !== "" ? <TableRow>
                            <TableCell><Button onClick={() => {this.saveRecipe()}}>Save Recipe</Button></TableCell>
                        </TableRow> : null}
                        
                    </TableBody>
                </Table>
            </div>
        )
    }

    render() {
        return this.displaySpoonInfo()
    }
}







