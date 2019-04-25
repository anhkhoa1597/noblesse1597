import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import SvgUri from 'react-native-svg-uri';


const SVGTab = () => (
    <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <SvgUri width="200" height="200" source={require('../../../assets/react-icon.svg')} />
    </View>
);

export default SVGTab;