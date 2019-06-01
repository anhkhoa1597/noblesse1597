//@flow

import React from 'react';
import { Switch, Route } from 'react-router-native';

import MainScreen from './main';

type Props = {};
export default (props: Props) => (
    <Switch>
        <Route exact path={"/"} component={MainScreen} />
    </Switch>
);