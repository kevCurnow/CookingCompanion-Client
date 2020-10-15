import React, {Component} from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {AddBox} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import APIURL from '../../helpers/environment';
import RecipeMapper from './RecipeMapper';

type AcceptedProps = {
    sessionToken: string
}

interface IState {
    recipes: [],
    recipesFetched: boolean
}

export default class RecipeTable extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            recipes: [],
            recipesFetched: false
        }
    }

    fetchRecipes = () => {
        let url = `${APIURL}/recipe/list/recipeList`
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': `${this.props.sessionToken}`
            })
        })
        .then(res => res.json())
        .then(results => {
            this.setState({ recipes: results})
        })
        .then(() => this.setState({ recipesFetched: true}))
        
    }

    componentDidMount() {
        this.fetchRecipes();
    }

    render() {
        return(
            <div>
                {this.state.recipesFetched ? <RecipeMapper recipeArray={this.state.recipes} /> : null}
            </div>
        )
    }
}