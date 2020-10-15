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
    result: any;
};

interface IState {

}

export default class SavedRecipeIngredients extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {

        };
    }

    displaySavedIngredients = () => {
        return this.props.result.ingredientList.map((ingredient: any, index: number) => {
            return (
                <ListItem key={index}>
                    <ListItemText>
                        {ingredient}
                    </ListItemText>
                </ListItem>
            );
        });
    };

    render() {
        return <List>{this.displaySavedIngredients()}</List>
    }
}