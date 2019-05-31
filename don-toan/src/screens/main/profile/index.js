import * as React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindHeaderBarActions } from '../../../redux/actions/headerbar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import  FormModal from '../../../components/FormModal'
import Courtesy from '../../../components/Courtesy'
import Time from '../../../components/Time'

import  { arrMoon } from "../../../../assets"

import {StdioDate} from '../../../helper/StdioDate';
import {StdioMonthYear} from '../../../helper/StdioMonthYear';
import { StdioDateHelper } from '../../../helper/StdioDateHelper';

class ProfileScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedMonthYear: null,
            selectedDate : null,
            calendarSolar : [],
            calendarLunar: [],
            modalVisible2: false,
        }
    }

    componentDidMount() {
        StdioDateHelper.initMoment();

        this.props.headerBarActions.setTitle("Lịch");

        const currentDate = StdioDateHelper.getCurrentDate();
        const selectedMonthYear = StdioDateHelper.getCurrentMonthYear();
        this.setState({
            selectedMonthYear: selectedMonthYear,
            selectedDate : currentDate,
            calendarSolar : this.createCalendar(selectedMonthYear)
        });
    }

    createCalendar = (currentMonthYear) => {

        let previousMonthDates = [];
        let currentMonthDates = [];
        let nextMonthDates = [];

        let previousMonthYear = StdioDateHelper.getPreviousMonthYear(currentMonthYear);
        let lastDateOfPreviousMonthYear = StdioDateHelper.getLastDateOfMonthYear(previousMonthYear);

        let nextMonthYear = StdioDateHelper.getNextMonthYear(currentMonthYear);
        let firstDateOfNextMonthYear = StdioDateHelper.getFirstDateOfMonthYear(nextMonthYear);

        let firstDateOfCurrentMonthYear = StdioDateHelper.getFirstDateOfMonthYear(currentMonthYear);
        let lastDateOfCurrentMonthYear = StdioDateHelper.getLastDateOfMonthYear(currentMonthYear);
                
        for (let i = firstDateOfCurrentMonthYear.getDayOfWeek() - 1; i >= 0; i--) {
            let date = new StdioDate;
            date.setDate(
                lastDateOfPreviousMonthYear.day - i,
                lastDateOfPreviousMonthYear.month,
                lastDateOfPreviousMonthYear.year
            );
            previousMonthDates.push(date);
        }

        for (let i = 0; i < 6 - lastDateOfCurrentMonthYear.getDayOfWeek(); i++) {
            let date = new StdioDate;
            date.setDate(
                firstDateOfNextMonthYear.day + i,
                firstDateOfNextMonthYear.month,
                firstDateOfNextMonthYear.year
            );
            nextMonthDates.push(date);
        }

        for (let day = 1; day <= lastDateOfCurrentMonthYear.day; day++) {
            let date = new StdioDate;
            date.setDate(
                day, 
                currentMonthYear.month, 
                currentMonthYear.year
            );
            currentMonthDates.push(date);
        }

        let calendarSolar = [];
        calendarSolar = calendarSolar.concat(previousMonthDates);
        calendarSolar = calendarSolar.concat(currentMonthDates);
        calendarSolar = calendarSolar.concat(nextMonthDates);

        return calendarSolar;
    }

    goToPreviousMonthYear = () => {
        let previousMonthYear = StdioDateHelper.getPreviousMonthYear(this.state.selectedMonthYear);
        let selectedDate = StdioDateHelper.getFirstDateOfMonthYear(previousMonthYear);
        this.setState({
            selectedMonthYear : previousMonthYear,
            selectedDate : selectedDate,
            calendarSolar: this.createCalendar(previousMonthYear)
        });
    }

    goToNextMonthYear = () => {
        let nextMonthYear = StdioDateHelper.getNextMonthYear(this.state.selectedMonthYear);
        let selectedDate = StdioDateHelper.getFirstDateOfMonthYear(nextMonthYear);
        this.setState({
            selectedMonthYear : nextMonthYear,
            selectedDate : selectedDate,            
            calendarSolar: this.createCalendar(nextMonthYear)
        });
    }

    goToPreviousYear = () => {
        let previousYear = StdioDateHelper.getPreviousYear(this.state.selectedMonthYear);
        let selectedDate = StdioDateHelper.getFirstDateOfMonthYear(previousYear);
        this.setState({
            selectedMonthYear : previousYear,
            selectedDate : selectedDate,            
            calendarSolar: this.createCalendar(previousYear)
        });
    }

    goToNextYear = () => {
        let nextYear = StdioDateHelper.getNextYear(this.state.selectedMonthYear);
        let selectedDate = StdioDateHelper.getFirstDateOfMonthYear(nextYear);
        this.setState({
            selectedMonthYear : nextYear,
            selectedDate : selectedDate,            
            calendarSolar: this.createCalendar(nextYear)
        });
    }

    toogleModal2 = () => {
        const { modalVisible2 } = this.state;
        this.setState({ modalVisible2: !modalVisible2 });
    };

    selectDate(date){
        this.toogleModal2();
        this.setState({
            selectedDate: date,
        })
    }

    renderCalendar(element){
        let isSelectedDate = element.isThisDate(this.state.selectedDate);
        let lunarDate = StdioDateHelper.convertSolarToLunar(element, 7.0);
        let isBadDay = StdioDateHelper.isBadDay(lunarDate);

        return (
            <View style={styles.day} key={[element.day, element.month, element.year]}>
                <TouchableOpacity
                    style={isSelectedDate ? styles.selectedDate : (isBadDay ? styles.date : styles.goodDate)}
                    onPress={() => this.selectDate(element)}
                >
                    <View style={styles.dayNumber}>
                        {
                            StdioDateHelper.isLastDateOfMonth(element) || element.day == 1 ? (
                                <Text style={isSelectedDate ? styles.textDayNumberSelected : (isBadDay ? styles.textDayNumber : styles.textGoodDayNumber)}>
                                    {element.day}/{element.month}
                                </Text>
                            ) : (
                                <Text style={isSelectedDate? styles.textDayNumberSelected : (isBadDay ? styles.textDayNumber : styles.textGoodDayNumber)}>
                                    {element.day}
                                </Text>
                            )
                        }
                        {
                            StdioDateHelper.isLastLunarDateOfMonth(lunarDate) || lunarDate.lunarDay == 1 ? (
                            <Text style={isSelectedDate ? styles.textMoonNumberSelected : (isBadDay ? styles.textMoonNumber : styles.textGoodMoonNumber)}>
                                {lunarDate.lunarDay}/{lunarDate.lunarMonth}
                            </Text>
                            ) : (
                            <Text style={isSelectedDate ? styles.textMoonNumberSelected : (isBadDay ? styles.textMoonNumber : styles.textGoodMoonNumber)}>
                                {lunarDate.lunarDay}
                            </Text>
                            )
                        }
                    </View>
                    <View style={styles.moon}>
                        <Image source={arrMoon[lunarDate.lunarDay-1]} style={styles.imageMoon}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const { selectedDate, modalVisible2 } = this.state;
        console.log('modalVise2', modalVisible2)
        if (selectedDate == null)
            return null;
        let datePicker = selectedDate.formatDate('DD-MM-YYYY');
        return (
            <View style={styles.contain}>
                <View style={styles.head}>
                    <View style={styles.left}>
                        <TouchableOpacity style={styles.touchDoubleIconLeft} onPress={this.goToPreviousYear}>
                            <Icon
                                style={styles.leftIcon}
                                name="angle-double-left"
                                color="rgba(164,172,193,1)"
                                size={35}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchIconLeft} onPress={this.goToPreviousMonthYear}>
                            <Icon
                                    style={styles.leftIcon}
                                    name="angle-left"
                                    color="rgba(164,172,193,1)"
                                    size={35}
                                    // onPress={}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.Month}>
                        <Text style={styles.textMonth}>
                            {StdioMonthYear.toString(this.state.selectedMonthYear)}
                        </Text>
                    </View>
                    <View style={styles.right}>
                        <TouchableOpacity style={styles.touchIconRight} onPress={this.goToNextMonthYear}>
                            <Icon
                                style={styles.rightIcon}
                                name="angle-right"
                                color="rgba(164,172,193,1)"
                                size={35}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchDoubleIconRight} onPress={this.goToNextYear}>
                            <Icon
                                style={styles.rightIcon}
                                name="angle-double-right"
                                color="rgba(164,172,193,1)"
                                size={35}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.week}>
                    <View style={styles.weekDays}>
                        <Text style={styles.textWeekDays}>T2</Text>
                    </View>
                    <View style={styles.weekDays}>
                        <Text style={styles.textWeekDays}>T3</Text>
                    </View>
                    <View style={styles.weekDays}>
                        <Text style={styles.textWeekDays}>T4</Text>
                    </View>
                    <View style={styles.weekDays}>
                        <Text style={styles.textWeekDays}>T5</Text>
                    </View>
                    <View style={styles.weekDays}>
                        <Text style={styles.textWeekDays}>T6</Text>
                    </View>
                    <View style={styles.weekDays}>
                        <Text style={styles.textWeekDays}>T7</Text>
                    </View>
                    <View style={styles.weekDays}>
                        <Text style={styles.textWeekDays}>CN</Text>
                    </View>
                </View>
                <View style={styles.gridDay}>
                {
                    this.state.calendarSolar.map(element => this.renderCalendar(element))
                } 
                    <DatePicker
                        style={{height: 50, borderRadius: 25, marginTop: 20,width: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}
                        date={datePicker}
                        mode="date"
                        placeholder="Select date"
                        format="DD-MM-YYYY"
                        minDate="01-01-1900"
                        maxDate="01-01-2100"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 15,
                            },
                            dateInput: {
                                borderColor: 'transparent',
                                marginLeft: 30,
                            }
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
                    <FormModal
                        visible={modalVisible2}
                        toogleModal={this.toogleModal2}
                        height={"100%"}
                    >
                        <Courtesy date={selectedDate}/>
                        <Time date={selectedDate}/>
                    </FormModal>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    contain: {
        backgroundColor: 'rgba(11,19,36,1)',
    },
    gridDay: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        height: '100%',
    },
    day: {
        width: '14.2857143%', 
        height: 80,
    },
    head: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(11,19,36,1)',
    },
    Month: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftIcon: {
        backgroundColor: 'rgba(11,19,36,1)',
        textAlign: 'center',
        color: 'rgba(164,172,193,1)',
        height: 50,
        padding: 0,
        lineHeight: 50,
    },
    rightIcon: {
        backgroundColor: 'rgba(11,19,36,1)',
        textAlign: 'center',
        height: 50,
        lineHeight: 50,
        padding: 0,
    },
    textMonth: {
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 50,
        color: 'white',
    },
    contain: {
        backgroundColor: 'rgba(11,19,36,1)',
    },
    date: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.3)',
        borderColor: 'rgba(11,19,36,1)',
    },
    selectedDate: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderBottomColor: 'rgba(255,0,0,0.3)',
        borderColor: 'rgba(11,19,36,1)',
    },
    goodDate: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderBottomColor: 'rgba(255,215,2,0.7)',
        borderColor: 'rgba(11,19,36,1)',
    },
    dayNumber: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1.5,
        padding: 2,
    },
    textDayNumber : {
        color: 'white',
        fontSize: 11,
    },
    textGoodDayNumber: {
        color: 'rgba(255,215,2,0.7)',
        fontSize: 11,
    },
    textDayNumberSelected: {
        color: 'red',
        opacity: 0.8,
        fontSize: 11,
    },
    textMoonNumber: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 9,
        marginTop: 4,
    },
    textGoodMoonNumber: {
        color: 'rgba(255,215,2,0.7)',
        fontSize: 9,
        marginTop: 4,
    },
    textMoonNumberSelected: {
        color: 'rgba(255,0,0,0.8)',
        opacity: 0.8,
        fontSize: 9,
        marginTop: 4,
    },
    moon: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageMoon: {
        borderRadius: 20,
        width: 40,
        height: 40,
    },
    week: {
        flexDirection: 'row',
        width: '100%',
        height: 18,
    },
    weekDays: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(21,32,50,1)'
    },
    textWeekDays: {
        color: 'white',
        fontSize: 12,
    },
    dayRow: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
    },
    touchIconLeft: {
        marginLeft: 20,
        height: 50,
    },
    touchIconRight: {
        marginRight: 20,
        height: 50,
    },
    touchDoubleIconRight: {
        height: 50,
    },
    touchDoubleIconLeft: {
        height: 50,
    },
    left: {
        flexDirection: 'row',
        marginLeft: 20,
        height: 50,
    },
    right: {
        flexDirection: 'row',
        marginRight: 20,
        height: 50,
    }
})

export default connect(null, 
    dispatch => bindHeaderBarActions({}, dispatch)
)(ProfileScreen);