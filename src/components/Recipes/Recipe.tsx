import React, {Component} from "react";
import APIURL from "../../helpers/environment";
import { Button } from "@material-ui/core";
import RecipeInstructions from "./RecipeInstructions";
import { IndeterminateCheckBox } from "@material-ui/icons";

type AcceptedProps = {
    sessionToken: string
    spoonID: number | undefined
    userID: number | undefined
}

interface IState {
    result: any
    resultRetrieved: boolean
    
}

export default class Recipe extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            result: {},
            resultRetrieved: false
            
        }
    }

componentDidMount() {
    this.fetchRecipe();
}
fetchRecipe = () => {
    let url = `${APIURL}/recipe/recipe/${this.props.spoonID}`
    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(recipe => this.setState({ result: recipe.result}))
    .then(() => this.setState({resultRetrieved: true}))

}

saveRecipe = () => {
    let recipe = this.state.result
    let url= `${APIURL}/recipe/${recipe.id}`
    let ingredientArray: any[] = new Array;
    function doStuff(s: string) {
        console.log(s, s.length);
        ingredientArray.push(s)
    }
    recipe.extendedIngredients.forEach((ingredient: { originalString: string;}) => {
        doStuff(ingredient.originalString)
    }) 
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
    .then(res => res.json())
    
    .catch(err => console.log(err))
}


render() {
    return(
        <div>
            <h1>This is the recipe component for {this.props.spoonID}: {this.state.result.title}</h1>
            {this.props.sessionToken !== "" && this.state.resultRetrieved ? <Button onClick={this.saveRecipe} >Save Recipe</Button> : null}
            {this.state.resultRetrieved ? (<RecipeInstructions result={this.state.result} />) : null}
        </div>
    )
}
}