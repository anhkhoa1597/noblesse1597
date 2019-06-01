//@flow

import React from 'react';
import { Switch, Route } from 'react-router-native';

import MainScreen from './main';
import DetailScreen from "./main/detail";

import { routes } from "../config/routes"

type Props = {};
export default (props: Props) => (
    <Switch>
        <Route exact path={routes.HOME} component={MainScreen} />
        <Route exact path={routes.DETAIL} component={DetailScreen} />
    </Switch>
);