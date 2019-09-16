import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import Admin from './components/Admin';
import { PrivateRoute } from './components/PrivateRoute';
import "./styles.scss";

function App() {
    return (
        <Router>
            <div className="App">
                <Route exact path="/" component={Login} />
                <PrivateRoute path='/protected' component={Admin} />
            </div>
        </Router>
    );
}

export default App;
