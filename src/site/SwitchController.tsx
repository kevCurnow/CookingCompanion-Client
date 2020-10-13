import React, { FC } from "react";
import { Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";
import Splash from "../components/Splash/Splash";
import Auth from "../components/User/Auth";
import RecipeSearch from "../components/Recipes/RecipeSearch";

type controllerState = {};
type ControllerProps = {
    updateSessionToken: (newToken: string) => void;
    sessionToken: string;
};

const SwitchController: FC<ControllerProps> = (props) => {
    return (
        <div>
            
            <Switch>
                <Route exact path="/"> <Splash /> </Route>
                <Route exact path="/home"><Splash /></Route>
                <Route exact path="/auth"><Auth updateSessionToken={props.updateSessionToken} sessionToken={props.sessionToken}/></Route>
                <Route exact path="/search" render={() => <RecipeSearch sessionToken={props.sessionToken}/>} />
                <Route exact path="/groceries" render={() => <Splash />} />
                <Route exact path="/admin" render={() => <Splash />} />
                <Route exact path="/logout" render={() => <Splash />} />
            </Switch>
            
        </div>
    )
}

export default SwitchController;