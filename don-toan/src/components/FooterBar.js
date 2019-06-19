import React from 'react';
import { Link, withRouter } from 'react-router-native';
import { StyleSheet, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { routes } from '../config/routes';

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        height: 50,
    },
    tabBar: {
        flex:1,
        backgroundColor: "#0ac",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

class FooterBar extends React.Component {
    constructor(props) {
        super(props);
        Text.defaultProps = Text.defaultProps || {};
        Text.defaultProps.allowFontScaling = false;
    }
    
    render() {
        return (
            <View style={styles.footer}>
                <View style={styles.tabBar}>
                    <Link to={routes.HOME}
                            style={styles.menuItem} 
                            underlayColor='#fff'>
                        <Text>Home</Text>
                    </Link>
                    <Link to={routes.PROFILE}
                            style={styles.menuItem} 
                            underlayColor='#fff'>
                        <Text>Profile</Text>
                    </Link>
                </View>
            </View>
        )
    }
}

export default withRouter(FooterBar);