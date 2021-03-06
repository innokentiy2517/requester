import React, {useContext} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {MAIN_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)

    console.log(user)
    return (
        <Switch>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={MAIN_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;