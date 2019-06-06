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
        console.log('queDonLucNham', queDonLucNham);
        console.log('queDonBatMon', queDonBatMon);
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
                <Grid>
                    <Row style={styles.rowHeader}>
                        <Col style={[styles.col, {backgroundColor: 'rgba(255,255,255,0.3)'}]}>
                            <Text style={styles.textTitle}>QUẺ</Text>
                        </Col>
                        <Col style={[styles.col1, {backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center'}]}>
                            <Text style={styles.textTitle}>NỘI DỤNG</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>{queDonBatMon}</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={[styles.text1]}>{StdioDateHelper.getChiTietQue(queDonBatMon)}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>{queDonLucNham}</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={[styles.text1]}>{StdioDateHelper.getChiTietQue(queDonLucNham)}</Text>
                        </Col>
                    </Row>
                </Grid>
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
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    text1: {
        fontSize: 14,
        color: '#fff',
    },
    leftIcon: {
        width: 15,
        height: 30,
        padding: 0,
        marginLeft: 15,
    },
    rowHeader: {
        width: '100%',
        height: 50,
    },
    row: {
        width: '100%',
    },
    col: {
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        flex: 1,
    },
    col1: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
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
        marginTop: 15,
        width: '100%',
        height: '70%',
    },
})

export default withRouter(HintScreen);
