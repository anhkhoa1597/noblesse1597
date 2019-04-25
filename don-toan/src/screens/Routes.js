//@flow

import React from 'react';
import { Switch, Route } from 'react-router-native';
import Stack from 'react-router-native-stack';

import { routes, MAIN_ROUTE } from '../config/routes';
import LoginScreen from './login';
import RegisterScreen from './register';
import MainRoutes from './main';

type Props = {};
export default (props: Props) => (
    <Switch>
        <Route exact path={routes.LOGIN} component={LoginScreen} />
        <Route exact path={routes.REGISTER} component={RegisterScreen} />

        <Route path={MAIN_ROUTE} component={MainRoutes} />
    </Switch>
);