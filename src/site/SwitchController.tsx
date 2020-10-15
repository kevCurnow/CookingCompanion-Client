import React, { FC } from "react";
import { Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";
import Splash from "../components/Splash/Splash";
import Auth from "../components/User/SignUp";
import RecipeSearch from "../components/Recipes/RecipeSearch";
import Recipe from "../components/Recipes/Recipe";
import Admin from "../components/User/Admin/Admin";
import RecipeTable from "../components/Recipes/RecipeTable";
import RecipeDisplay from "../components/Recipes/RecipeDisplay";
import SignUp from "../components/User/SignUp";
import LogIn from "../components/User/LogIn";

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
    updateSavedID: (newID: number) => void;
    savedID: number | undefined
};

const SwitchController: FC<ControllerProps> = (props) => {
    return (
        <div>
            
            <Switch>
                <Route exact path="/"> <Splash /> </Route>
                <Route exact path="/home"><Splash /></Route>
                <Route exact path="/login" render={() => <LogIn updateSessionToken={props.updateSessionToken} sessionToken={props.sessionToken} isAdmin={props.isAdmin} adminVerification={props.adminVerification} updateUserID={props.updateUserID}/>} />
                <Route exact path="/signup" render={() => <SignUp updateSessionToken={props.updateSessionToken} sessionToken={props.sessionToken} isAdmin={props.isAdmin} adminVerification={props.adminVerification} updateUserID={props.updateUserID}/>} />
                <Route exact path="/search" render={() => <RecipeSearch sessionToken={props.sessionToken} updateRecipeID={props.updateRecipeID} spoonID={props.spoonID} userID={props.userID}/>} />
                <Route exact path="/recipe" render={() => <RecipeDisplay sessionToken={props.sessionToken} spoonID={props.spoonID} userID={props.userID} savedID={props.savedID}/> } />
                <Route exact path="/recipes" render={() => <RecipeTable sessionToken={props.sessionToken} savedID={props.savedID} updateSavedID={props.updateSavedID} />} />
                <Route exact path="/groceries" render={() => <Splash />} />
                <Route exact path="/admin" render={() => <Admin isAdmin={props.isAdmin} sessionToken={props.sessionToken} />} />
                <Route exact path="/logout" render={() => <Splash />} />
            </Switch>
            
        </div>
    )
}

export default SwitchController;