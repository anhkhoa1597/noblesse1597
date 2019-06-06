//@flow

import React from 'react';
import { Switch, Route } from 'react-router-native';

import MainScreen from './main';
import DetailScreen from "./main/detail";
import HintScreen from './main/hint'

import { routes } from "../config/routes"

type Props = {};
export default (props: Props) => (
    <Switch>
        <Route exact path={routes.HOME} component={MainScreen} />
        <Route exact path={routes.DETAIL} component={DetailScreen} />
        <Route exact path={routes.HINT} component={HintScreen} />
    </Switch>
);