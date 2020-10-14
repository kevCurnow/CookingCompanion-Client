import React, { Component } from "react";
import { Link, Redirect, BrowserRouter as Router } from "react-router-dom";
import {AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
type AcceptedProps = {
    sessionToken: string;
}

interface IState {
    
}

class Navbar extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div>
                    <Toolbar>
                        <Button>
                            <Link to="/home">Home</Link>
                        </Button>
                        <Button>
                            <Link to="/search">Search</Link>
                        </Button>
                        {this.props.sessionToken === "" ? (
                            <Button>
                                <Link to="/auth">Login</Link>
                            </Button>
                        ) : (
                            <div>
                                <Button>
                                <Link to="/recipes">Recipe List</Link>
                            </Button>
                            <Button>
                                <Link to="/groceries">Groceries</Link>
                            </Button>
                            <Button>
                                <Link to="/admin">Admin</Link>
                            </Button>
                            <Button>
                                <Link to="/logout">Logout</Link>
                            </Button>
                            </div>
                        )

                        }
                        
                    </Toolbar>
                </div>
            </div>
        )
    }
}

export default Navbar;