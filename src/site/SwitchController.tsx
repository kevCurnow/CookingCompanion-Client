import React, { FC } from "react";
import { Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";
import Splash from "../components/Splash/Splash";
import Auth from "../components/User/Auth";
import RecipeSearch from "../components/Recipes/RecipeSearch";
import Recipe from "../components/Recipes/Recipe";
import Admin from "../components/User/Admin/Admin";
import RecipeTable from "../components/Recipes/RecipeTable";

type controllerState = {};
type ControllerProps = {
    updateSessionToken: (newToken: string) => void;
    updateRecipeID: (newID: number) => void;
    sessionToken: string;
    spoonID: number | undefined;
    isAdmin: string;
    adminVerification: (adminString: string) => void;
    updateUserID: (newID: number) => void;
    userID: number | undefined;
};

const SwitchController: FC<ControllerProps> = (props) => {
    return (
        <div>
            
            <Switch>
                <Route exact path="/"> <Splash /> </Route>
                <Route exact path="/home"><Splash /></Route>
                <Route exact path="/auth"><Auth updateSessionToken={props.updateSessionToken} sessionToken={props.sessionToken} isAdmin={props.isAdmin} adminVerification={props.adminVerification} updateUserID={props.updateUserID}/></Route>
                <Route exact path="/search" render={() => <RecipeSearch sessionToken={props.sessionToken} updateRecipeID={props.updateRecipeID} spoonID={props.spoonID} userID={props.userID}/>} />
                <Route exact path="/recipe" render={() => <Recipe sessionToken={props.sessionToken} spoonID={props.spoonID} userID={props.userID}/> } />
                <Route exact path="/recipes" render={() => <RecipeTable sessionToken={props.sessionToken} />} />
                <Route exact path="/groceries" render={() => <Splash />} />
                <Route exact path="/admin" render={() => <Admin isAdmin={props.isAdmin} sessionToken={props.sessionToken} />} />
                <Route exact path="/logout" render={() => <Splash />} />
            </Switch>
            
        </div>
    )
}

export default SwitchController;