import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';
const styles = StyleSheet.create({
    calendar: {
        width: '100%',
        height: '70%'
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
        borderBottomColor: '#ccc',
        borderRightColor: '#000',
        borderLeftColor: '#000',
        backgroundColor: 'rgba(11,19,36,1)',
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
        flexDirection: 'column',
        flex: 1,
    },
    btnDay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    LDay: {
        position: 'absolute',
        bottom: 1,
        right: 1,
    },
    textD: {
        fontSize: 12,
        color: "#ccc"
    },
    textLD: {
        fontSize: 13,
        color: 'blue'
    },
    Moon: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageMoon: {
        width: 40,
        height: 40,
    }
});

class Calendar extends React.Component {
    constructor(props) {
        super(props);
    }
    renderDay() {
        return (
            <View style={styles.days}>
                <TouchableOpacity style={styles.btnDay}>
                    <Text style={styles.textD}>1</Text>
                </TouchableOpacity>
                <View style={styles.Moon}>
                    <Image source={require("../../assets/moon.jpg")} style={styles.imageMoon}/>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.calendar}>
                <Grid>
                    <Row style={styles.week}>
                        <Col style={styles.weekDays}>
                            <Text style={styles.textWeekDays}>Mon</Text>
                        </Col>
                        <Col style={styles.weekDays}>
                            <Text style={styles.textWeekDays}>Tue</Text>
                        </Col>
                        <Col style={styles.weekDays}>
                            <Text style={styles.textWeekDays}>Wed</Text>
                        </Col>
                        <Col style={styles.weekDays}>
                            <Text style={styles.textWeekDays}>Thu</Text>
                        </Col>
                        <Col style={styles.weekDays}>
                            <Text style={styles.textWeekDays}>Fri</Text>
                        </Col>
                        <Col style={styles.weekDays}>
                            <Text style={styles.textWeekDays}>Sat</Text>
                        </Col>
                        <Col style={styles.weekDays}>
                            <Text style={styles.textWeekDays}>Sun</Text>
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
                        <Col style={styles.day}>{ this.renderDay() }</Col>
                    </Row>
                </Grid>
            </View>
        );
    }
}

export default Calendar;