import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    calendar: {
        width: '100%',
        aspectRatio: 5/3,
    },
    head:{
        width: '100%',
        flex: 1,
    },
    week: {
        width: '100%',
        flex: 1,
    },
    dayOfMonth: {
        width: '100%',
        flex: 1.5,
    },
    weekDays: {
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFECC'
    },
    day: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#FDFDF0'
    },
    dayPicked: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#FFF000'
    },
    headLeft:{
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        backgroundColor: '#CCFFCC',
    },
    headMonth:{
        borderWidth: 1,
        borderColor: '#ccc',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CCFFCC',
    },
    headRight:{
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CCFFCC',
    },
    iconDL: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 5,
        marginRight: 5,
    },
    iconL: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 5,
        marginRight: 5,
    },
    iconDR: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 5,
        marginRight: 5,
    },
    iconR: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 5,
        marginRight: 5,
    },
    textMonth: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    textWeekDays: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    days: {
        flex: 1
    },
    btnDay: {
        position: 'absolute',
        top: 1,
        left: 1,
    },
    LDay: {
        position: 'absolute',
        bottom: 1,
        right: 1,
    },
    textD: {
        fontSize: 17,
        // textDecorationLine: 'underline',
        color: 'blue'
    },
    textLD: {
        fontSize: 13,
        color: 'blue'
    }
});

class Calendar extends React.Component {
    constructor(props) {
        super(props);
    }
    renderDay() {
        return (
            <View style={styles.days}>
                <TouchableOpacity>
                    <View style={styles.btnDay}>
                        <Text style={styles.textD}>1</Text>
                    </View>
                </TouchableOpacity>
                <View  style={styles.LDay}> 
                    <Text style={styles.textLD}>27/2</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.calendar}>
                <Grid>
                    <Row style={styles.head}>
                        <Col style={styles.headLeft}>
                            <TouchableOpacity>
                                <Icon
                                    name='angle-double-left'
                                    style={styles.iconDL}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon
                                    name='angle-left'
                                    style={styles.iconL}
                                />
                            </TouchableOpacity>
                        </Col>
                        <Col style={styles.headMonth}>
                            <Text style={styles.textMonth}>4/2019</Text>
                        </Col>
                        <Col style={styles.headRight}>
                            <TouchableOpacity>
                                <Icon
                                    name='angle-right'
                                    style={styles.iconR}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon
                                    name='angle-double-right'
                                    style={styles.iconDR}
                                />
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <Row style={styles.week}>
                        <Col style={styles.weekDays}>
                            <Text style={styles.textWeekDays}>CN</Text>
                        </Col>
                        <Col style={styles.weekDays}>
                            <Text style={styles.textWeekDays}>T2</Text>
                        </Col>
                        <Col style={styles.weekDays}>
                            <Text style={styles.textWeekDays}>T3</Text>
                        </Col>
                        <Col style={styles.weekDays}>
                            <Text style={styles.textWeekDays}>T4</Text>
                        </Col>
                        <Col style={styles.weekDays}>
                            <Text style={styles.textWeekDays}>T5</Text>
                        </Col>
                        <Col style={styles.weekDays}>
                            <Text style={styles.textWeekDays}>T6</Text>
                        </Col>
                        <Col style={styles.weekDays}>
                            <Text style={styles.textWeekDays}>T7</Text>
                        </Col>
                    </Row>
                    <Row style={styles.dayOfMonth}>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                    </Row>
                    <Row style={styles.dayOfMonth}>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                    </Row>
                    <Row style={styles.dayOfMonth}>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                    </Row>
                    <Row style={styles.dayOfMonth}>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                    </Row>
                    <Row style={styles.dayOfMonth}>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                    </Row>
                    <Row style={styles.dayOfMonth}>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                        <Col style={styles.dayPicked}>{ this.renderDay() }</Col>
                    </Row>
                </Grid>
            </View>
        );
    }
}

export default Calendar;