import { Switch, Route, withRouter } from 'react-router-native';
import React from 'react';
import { View } from 'react-native';

import HeaderBar from '../../components/HeaderBar';
import FooterBar from '../../components/FooterBar';

import HomeScreen from './home';
import { routes } from '../../config/routes';
import ProfileScreen from './profile';

const MainRoutes = () => (
    <View style={{ flex: 1 }}>
        <HeaderBar />
        <Switch>        
            <Route exact path={routes.HOME} component={HomeScreen} />
            <Route exact path={routes.PROFILE} component={ProfileScreen} />
        </Switch>
        <FooterBar />
    </View>
)

export default MainRoutes;