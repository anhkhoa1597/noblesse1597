import * as React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';
import { bindHeaderBarActions } from '../../redux/actions/headerbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';

import  { arrMoon } from "../../../assets"

import {StdioDate} from '../../helper/StdioDate';
import {StdioMonthYear} from '../../helper/StdioMonthYear';
import { StdioDateHelper } from '../../helper/StdioDateHelper';

class MainScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedMonthYear: null,
            selectedDate : null,
            toDay: null,
            calendarSolar : [],
            calendarLunar: [],
            modalVisible2: false,
        }
    }

    componentDidMount() {
        StdioDateHelper.initMoment();

        this.props.headerBarActions.setTitle("Lịch");
        const toDay = StdioDateHelper.getCurrentDate();
        const currentDate = StdioDateHelper.getCurrentDate();
        const selectedMonthYear = StdioDateHelper.getCurrentMonthYear();
        this.setState({
            selectedMonthYear: selectedMonthYear,
            selectedDate : currentDate,
            toDay: toDay,
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
        console.log('sddasdsa')
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

    goToSelectedMonthYearFromDatePicker = (date) => {
        let monthYear = StdioDateHelper.getMonthYearFromDate(date);
        this.setState({
            selectedDate: date,
            selectedMonthYear: monthYear,
            calendarSolar: this.createCalendar(monthYear)
        });
    }

    toogleModal2 = () => {
        this.setState({ modalVisible2: false });
    };

    selectDate = (date) => {
        console.log('adsfdsafda');
        this.setState({
            selectedDate: date
        })
        this.props.history.push({
            pathname: "/detail",
            state: date});
    }

    renderCalendar(element){
        let isToday = element.isThisDate(this.state.toDay);
        let isSelectedDay = element.isThisDate(this.state.selectedDate);
        let lunarDate = StdioDateHelper.convertSolarToLunar(element, 7.0);
        let isBadDay = StdioDateHelper.isBadDay(lunarDate);

        return (
            <View style={isToday ? styles.toDay : styles.day} key={[element.day, element.month, element.year]}>
                <TouchableOpacity
                    style={isBadDay ? styles.date : styles.goodDate}
                    onPress={() => this.selectDate(element)}
                >
                    <View style={styles.dayNumber}>
                        {
                            StdioDateHelper.isLastDateOfMonth(element) || element.day == 1 ? (
                                <Text style={isBadDay ? styles.textDayNumber : styles.textGoodDayNumber}>
                                    {element.day}/{element.month}
                                </Text>
                            ) : (
                                <Text style={isBadDay ? styles.textDayNumber : styles.textGoodDayNumber}>
                                    {element.day}
                                </Text>
                            )
                        }
                        {
                            StdioDateHelper.isLastLunarDateOfMonth(lunarDate) || lunarDate.lunarDay == 1 ? (
                            <Text style={isBadDay ? styles.textMoonNumber : styles.textGoodMoonNumber}>
                                {lunarDate.lunarDay}/{lunarDate.lunarMonth}
                            </Text>
                            ) : (
                            <Text style={isBadDay ? styles.textMoonNumber : styles.textGoodMoonNumber}>
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
        const { selectedDate } = this.state;
        console.log('selectedDate', selectedDate)

        if (selectedDate == null)
            return null;
            
        let datePicker = selectedDate.formatDate('DD-MM-YYYY');
        return (
            <View>
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
                        onDateChange={(date) => {
                            let stdioDate = StdioDateHelper.getStdioDateFromDateString(date,"DD-MM-YYYY");
                            this.goToSelectedMonthYearFromDatePicker(stdioDate);
                        }}
                    />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    contain: {
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
    },
    Month: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftIcon: {
        textAlign: 'center',
        color: 'rgba(164,172,193,1)',
        height: 50,
        padding: 0,
        lineHeight: 50,
    },
    rightIcon: {
        textAlign: 'center',
        height: 50,
        lineHeight: 50,
        padding: 0,
    },
    textMonth: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 50,
        color: 'white',
    },
    contain: {
    },
    date: {
        width: '100%',
        height: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.3)',
    },
    selectedDate: {
        width: '100%',
        height: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,0,0,0.3)',
    },
    goodDate: {
        width: '100%',
        height: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,215,2,0.7)',
    },
    toDay: {
        width: '14.2857143%', 
        height: 80,
        backgroundColor: 'rgba(255,255,255,0.3)',
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
        borderRadius: 25,
        width: 50,
        height: 50,
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

export default withRouter(connect(null, 
    dispatch => bindHeaderBarActions({}, dispatch)
)(MainScreen));
