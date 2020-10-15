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
  TextField,
} from "@material-ui/core";
import { AddBox, Delete } from "@material-ui/icons";
import APIURL from "../../helpers/environment";
import { Redirect } from "react-router-dom";

type AcceptedProps = {
    sessionToken: string;
    formOpen: boolean;
    handleClose: () => void;
};

interface IState {
    recipeName: string;
    readyInMinutes: number;
    servings: number;
    calories: number;
    ingredientString: string;
    stepString: string;
}

export default class RecipeCreate extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            recipeName: "",
            readyInMinutes: 0,
            servings: 0,
            calories: 0,
            ingredientString: "",
            stepString: ""
        };
    }

    submitRecipe = () => {
        let ingredientArr = this.state.ingredientString.split("$");
        let stepArr = this.state.stepString.split("$");
        let url = `${APIURL}/recipe`
        let recipeObject = {
            recipeName: this.state.recipeName,
            readyInMinutes: this.state.readyInMinutes,
            servings: this.state.servings,
            calories: this.state.calories,
            ingredientList: ingredientArr,
            steps: stepArr
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(recipeObject),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
        .then( res => res.json())
        .then( () => {this.props.handleClose()})
        .catch(err => console.log(err))
    }

    render() {
        return (
            <Dialog open={this.props.formOpen} onClose={this.props.handleClose}>
                <DialogTitle>Create a Recipe</DialogTitle>
                <DialogContent>
                    <h3>Recipe Name</h3>
                    <TextField type="text" onChange={(e) => {
                        this.setState({ recipeName: e.target.value})
                    }} />
                    <h3>Time to Cook in Minutes</h3>
                    <TextField type="text" onChange={(e) => {
                        this.setState({ readyInMinutes: parseInt(e.target.value)})
                    }} />
                    <h3>Number of Servings</h3>
                    <TextField type="text" onChange={(e) => {
                        this.setState({ servings: parseInt(e.target.value)})
                    }} />
                    <h3>Calories per Serving</h3>
                    <TextField type="text" onChange={(e) => {
                        this.setState({ calories: parseInt(e.target.value)})
                    }} />
                    <h3>Ingredients</h3>
                    <p>Separate each ingredient with a $. Don't forget to include quantities and measurements!</p>
                    <TextField multiline rows={10} variant="outlined" type="text" onChange={(e) => {
                        this.setState({ ingredientString: e.target.value })
                    }} />
                    <h3>Instructions</h3>
                    <p>Separate each ingredient with a $. No need to include step numbers</p>
                    <TextField multiline rows={10} variant="outlined" type="text" onChange={(e) => {
                        this.setState({ stepString: e.target.value })
                    }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.submitRecipe}>Create</Button>
                </DialogActions>
            </Dialog>
        )
    }
}