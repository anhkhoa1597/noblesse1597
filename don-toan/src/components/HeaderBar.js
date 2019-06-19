import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 70,
        backgroundColor: 'rgba(55,64,79,1)',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 10,
        marginRight: 10,
        fontWeight: 'bold',
        color: '#fff',
    },
    leftIcon: {
        backgroundColor: 'rgba(57,64,78,1)',
        // backgroundColor: 'white',
        width: 15,
        height: 30,
        padding: 0,
        marginLeft: 10,
        // paddingLeft: 15,
    },
    theMoonText: {
        color:"rgba(164,172,193,1)",
        fontSize: 15,
        height: 15,
        marginBottom: 5,
    },
});

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        Text.defaultProps = Text.defaultProps || {};
        Text.defaultProps.allowFontScaling = false;
    }
    render() {
        const { title, actionCallback, visible, history } = this.props;
        const { pathname } = this.props.location;

        return (
            <View style={styles.header}>
                { _.sumBy(pathname, c => c === '/') >= 2 && (
                <TouchableOpacity onPress={() => history.goBack()} style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Icon
                        style={styles.leftIcon}
                        name="angle-left"
                        color="rgba(164,172,193,1)"
                        size={35}
                    />
                    <Text style={styles.theMoonText}>The Moon</Text>
                </TouchableOpacity>
                )}
                <View style={[styles.center, {flex: 1}]}>
                    <Text style={[styles.text, {fontSize: 15}]}>{title}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}> 
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