import * as React from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Courtesy from '../../components/Courtesy'
import Time from '../../components/Time'
import { withRouter } from 'react-router-native';


class DetailScreen extends React.Component {
    constructor() {
        super();
    }

    render() {
        const data = this.props.location.state
        console.log('data', data)
        return (
        <View style={styles.contain}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => this.props.history.goBack()} style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Icon
                        style={styles.leftIcon}
                        name="angle-left"
                        color="rgba(164,172,193,1)"
                        size={35}
                    />
                </TouchableOpacity>
                <View style={[styles.center, {flex: 1}]}>
                    <Text style={[styles.text, {fontSize: 18}]}>CHI TIẾT</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}> 
                </View>
            </View>
            <Courtesy date={data}/>
            <Time date={data}/>
        </View>
        );
    }
};

const styles = StyleSheet.create({
    contain: {
        flex: 1
    },
    header: {
        width: '100%',
        height: 50,
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
        width: 15,
        height: 30,
        padding: 0,
        marginLeft: 15,
    },
})


export default withRouter(DetailScreen);
