import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Col, Row, Grid } from "react-native-easy-grid";
import { withRouter } from 'react-router-native';
import { StdioDateHelper } from '../../helper/StdioDateHelper';


class HintScreen extends React.Component {
    constructor() {
        super();
    }

    render() {
        const queDonLucNham = this.props.location.queDonLucNham;
        const queDonBatMon = this.props.location.queDonBatMon;
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
                    <Text style={[styles.text, {fontSize: 18}]}>TRA CỨU</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}> 
                </View>
            </View>
            <View style={styles.Hint}>
                <View style={styles.rowHeader}>
                    <View style={[styles.col, {backgroundColor: 'rgba(255,255,255,0.4)'}]}>
                        <Text style={styles.textTitle}>QUẺ</Text>
                    </View>
                    <View style={[styles.col1, {justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.4)'}]}>
                        <Text style={styles.textTitle}>NỘI DUNG</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.textTitle}>{queDonBatMon}</Text>
                    </View>
                    <View style={styles.col1}>
                        <Text style={styles.text}>{StdioDateHelper.getChiTietQue(queDonBatMon)}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.textTitle}>{queDonLucNham}</Text>
                    </View>
                    <View style={styles.col1}>
                        <Text style={styles.text}>{StdioDateHelper.getChiTietQue(queDonLucNham)}</Text>
                    </View>
                </View>
            </View>
        </View>
        );
    }
};

const styles = StyleSheet.create({
    contain: {
        alignItems: 'center',        
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
        fontSize: 12,
        color: '#fff',
    },
    text1: {
        fontSize: 12,
        color: '#fff',
    },
    leftIcon: {
        width: 15,
        height: 30,
        padding: 0,
        marginLeft: 15,
    },
    rowHeader: {
        flexDirection: 'row',
        width: '100%',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
    },
    col: {
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRightColor: 'rgba(255,255,255,0.3)',
        borderBottomColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        flex: 1,
    },
    col1: {
        padding: 5,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRightColor: 'rgba(255,255,255,0.3)',
        borderBottomColor: 'rgba(255,255,255,0.3)',
        backgroundColor: 'rgba(255,255,255,0.1)',
        flex: 4,
        flexDirection: 'row',
    },
    textTitle: {
        color: 'white',
        fontSize: 12,
        fontWeight:'bold',
    },
    Hint: {
        width: '100%',
    },
})

export default withRouter(HintScreen);
