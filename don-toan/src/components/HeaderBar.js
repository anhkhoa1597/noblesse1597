import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';

import _ from 'lodash';

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 70,
        backgroundColor: '#057',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        color: '#fff',
    }
});

class HeaderBar extends React.Component {
    render() {
        const { title, actionCallback, visible, history } = this.props;
        const { pathname } = this.props.location;

        return (
            <View style={styles.header}>
                <View style={{flex: 1}}>
                    { _.sumBy(pathname, c => c === '/') >= 3 && (
                    <TouchableOpacity onPress={() => history.goBack()}>
                        <Text style={[styles.text, {fontSize: 10}]}>Back</Text>
                    </TouchableOpacity>
                    )}
                </View>
                <View style={[styles.center, {flex: 5}]}>
                    <Text style={[styles.text, {fontSize: 25}]}>{title}</Text>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity>
                        <Text style={[styles.text, {fontSize: 10}]}>Action</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

export default withRouter(connect(
    state => {
        const { visible, title, actionCallback } = state.headerbar;

        return {
            visible,
            title,
            actionCallback
        }
    }
)(HeaderBar));