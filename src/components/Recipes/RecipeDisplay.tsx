import React, {Component} from "react";
import APIURL from "../../helpers/environment";
import { Button, Container, Grid, Paper } from "@material-ui/core";
import SpoonRecipeInstructions from "./RecipeInstructions/SpoonRecipeInstructions";
import SavedRecipeInstructions from "./RecipeInstructions/SavedRecipeInstructions";
import SpoonRecipeIngredients from "./RecipeIngredients/SpoonRecipeIngredients";
import SavedRecipeIngredients from "./RecipeIngredients/SavedRecipeIngredients";
import SpoonRecipeInfo from "./RecipeInfo/SpoonRecipeInfo";
import SavedRecipeInfo from "./RecipeInfo/SavedRecipeInfo";


type AcceptedProps = {
    sessionToken: string
    spoonID: number | undefined
    savedID: number | undefined
    userID: number | undefined
}

interface IState {
    result: any
    resultRetrieved: boolean
}

export default class RecipeDisplay extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            result: {},
            resultRetrieved: false
        }
    }

    componentDidMount() {
        this.setState({ resultRetrieved: false});
        console.log(this.state.resultRetrieved);
        console.log(this.props.spoonID);
        console.log(this.props.savedID);
        (this.props.spoonID !== undefined ? this.fetchSpoonRecipe() : this.fetchSavedRecipe())
    }

    checkForInfo = () => {
        return (
            this.props.spoonID !== undefined ? <SpoonRecipeInfo result={this.state.result} sessionToken={this.props.sessionToken} userID={this.props.userID}/> : <SavedRecipeInfo result={this.state.result} sessionToken={this.props.sessionToken}/>
        )
    }

    checkForInstructions = () => {
        return (
            this.props.spoonID !== undefined ? <SpoonRecipeInstructions result={this.state.result}/> : <SavedRecipeInstructions sessionToken={this.props.sessionToken} result={this.state.result}/>
        )
        
    }

    checkForIngredients = () => {
        return (
            this.props.spoonID !== undefined ? <SpoonRecipeIngredients result={this.state.result}/> : <SavedRecipeIngredients result={this.state.result}/>
        )
    }

    fetchSavedRecipe = () => {
        let url = `${APIURL}/recipe/saved/${this.props.savedID}`
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': this.props.sessionToken
            })
        })
        .then(res => res.json())
        .then(recipe => this.setState({ result: recipe}))
        .then(() => console.log(this.state.result))
        .then(() => this.setState({resultRetrieved: true}))
    }
    fetchSpoonRecipe = () => {
        let url = `${APIURL}/recipe/recipe/${this.props.spoonID}`
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(recipe => this.setState({ result: recipe.result}))
        .then(() => console.log(this.state.result))
        .then(() => this.setState({resultRetrieved: true}))
    }

    render() {
        return(
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper>{this.state.resultRetrieved ? this.checkForInfo() : null}</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>{this.state.resultRetrieved ? this.checkForInstructions() : null}</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>{this.state.resultRetrieved ? this.checkForIngredients() : null}</Paper>
                    </Grid>
                
                </Grid>
            </div>
        )
    }
}