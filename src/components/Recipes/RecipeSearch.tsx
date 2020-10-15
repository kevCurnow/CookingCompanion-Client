import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import APIURL from "../../helpers/environment";
import RecipeSearchDisplay from "./RecipeSearchDisplay";

type AcceptedProps = {
    sessionToken: string;
    updateRecipeID: (newID: number) => void;
    spoonID: number | undefined;
    userID: number | undefined;
}

interface IState  {
    searchString: string,
    resultsArray: [],
    displaySearchResults: boolean
}

class RecipeSearch extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            resultsArray: [],
            searchString: "",
            displaySearchResults: false
        }
    }

    handleSearch = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        this.setState({ displaySearchResults: true})
        let url = `${APIURL}/recipe/${this.state.searchString}`
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(results => this.setState({ resultsArray: results.results}))
        
        
    }

    render() {
        return(
            <div>
                <div>
                <h2>Search for recipes</h2>
                <p>Enter a search term to find your next great recipe</p>
                <TextField label="recipe search term" variant="outlined" type="text" onChange={(e) => {
                    this.setState({ searchString: e.target.value});
                }} />
                <Button onClick={this.handleSearch}> Search </Button>
                </div>
                {
                    this.state.displaySearchResults ? <RecipeSearchDisplay results={this.state.resultsArray} sessionToken={this.props.sessionToken} updateRecipeID={this.props.updateRecipeID} spoonID={this.props.spoonID} userID={this.props.userID}/> : null
                }
            </div>
            
        )
    }
}

export default RecipeSearch;