import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  TableRow,
  TableCell,
  Table,
  TableBody,
  List,
} from "@material-ui/core";

type AcceptedProps = {
    result: any
};

interface IState {

}

export default class SpoonRecipeIngredients extends Component<AcceptedProps, IState>{
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {

        }
    }

    displaySpoonIngredients = () => {
        let ingredientsArray = this.props.result.extendedIngredients;
        return ingredientsArray.map((ingredient: any) => {
            return (
                <ListItem key = {ingredient.id}>
                    <ListItemText>
                        {ingredient.originalString}
                    </ListItemText>
                </ListItem>
            );
        });
    };

    render() {
        return <List>{this.displaySpoonIngredients()}</List>
    }
}