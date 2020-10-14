import React, {Component} from "react";
import APIURL from "../../helpers/environment";
import { Button } from "@material-ui/core";
import RecipeInstructions from "./RecipeInstructions";

type AcceptedProps = {
    sessionToken: string
    spoonID: number | undefined
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
    console.log(url);
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


render() {
    return(
        <div>
            <h1>This is the recipe component for {this.props.spoonID}: {this.state.result.title}</h1>
            {this.state.resultRetrieved ? (<RecipeInstructions result={this.state.result} />) : null}
        </div>
    )
}
}