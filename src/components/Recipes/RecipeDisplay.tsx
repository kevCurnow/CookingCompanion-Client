import React, {Component} from "react";
import APIURL from "../../helpers/environment";
import { Button } from "@material-ui/core";
import SpoonRecipeInstructions from "./RecipeInstructions/SpoonRecipeInstructions";
import SavedRecipeInstructions from "./RecipeInstructions/SavedRecipeInstructions";


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
        (this.props.spoonID !== undefined ? this.fetchSpoonRecipe() : this.fetchSavedRecipe())
    }

    spoonIDCheck = () => {
        return (
            this.props.spoonID !== undefined ? <SpoonRecipeInstructions result={this.state.result}/> : <SavedRecipeInstructions result={this.state.result}/>
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
                {this.state.resultRetrieved ? this.spoonIDCheck() : null}
            </div>
        )
    }
}