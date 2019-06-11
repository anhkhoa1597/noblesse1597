import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, ScrollView } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import { StdioDate } from '../helper/StdioDate';
import { StdioMonthYear } from '../helper/StdioMonthYear';
import { StdioDateHelper } from '../helper/StdioDateHelper';

class Courtesy extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        
    }

    render() {
        const { date } = this.props;
        let lunarDate, lacThuFromDay, styleLacThuFromDay, lacThuFromMonth, styleLacThuFromMonth, lacThuFromYear, styleLacThuFromYear;
        // date = new StdioDate;
        // date.setDate(1, 3, 2019);
        lunarDate = StdioDateHelper.convertSolarToLunar(date, 7.0);
        let tuoiKyFromDay = StdioDateHelper.getTuoiKyFromDay(date);
        let tuoiKyFromMonth = StdioDateHelper.getTuoiKyFromMonth(lunarDate);
        let tuoiKyFromYear = StdioDateHelper.getTuoiKyFromYear(lunarDate.lunarYear);
        return (
                <View style={styles.courtesy}>
                        <View style={styles.dataContainer}>
                            <View style={[styles.data, {backgroundColor: 'rgba(255,255,255,0.4)'}]}>
                                <Text style={styles.textDataHead}>LỊCH</Text>
                            </View>
                            <View style={[styles.data, {backgroundColor: 'rgba(255,255,255,0.4)'}]}>
                                <Text style={styles.textDataHead}>NGÀY</Text>
                            </View>
                            <View style={[styles.data, {backgroundColor: 'rgba(255,255,255,0.4)'}]}>
                                <Text style={styles.textDataHead}>THÁNG</Text>
                            </View>
                            <View style={[styles.data, {backgroundColor: 'rgba(255,255,255,0.4)'}]}>
                                <Text style={styles.textDataHead}>NĂM</Text>
                            </View>
                        </View>
                        <View style={styles.dataContainer}>
                            <View style={[styles.data, {backgroundColor: 'rgba(255,255,255,0.4)'}]}>
                                <Text style={styles.textDataHead}>DƯƠNG LỊCH</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.textData}>{date.day}</Text>
                                <Text style={styles.textData}>({StdioDateHelper.getDayOfWeekFromDate(date)})</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.textData}>{date.month}</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.textData}>{date.year}</Text>
                            </View>
                        </View>
                        <View style={styles.dataContainer}>
                            <View style={[styles.data, {backgroundColor: 'rgba(255,255,255,0.4)'}]}>
                                <Text style={styles.textDataHead}>LỊCH DỊCH LÝ HỌC</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.textData}>{lunarDate.lunarDay}</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.textData}>{StdioDateHelper.convertLunarMonthToString(lunarDate.lunarMonth, lunarDate.lunarLeap)}</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.textData}>{lunarDate.lunarYear}</Text>
                            </View>
                        </View>
                        <View style={styles.dataContainer}>
                            <View style={[styles.data, {backgroundColor: 'rgba(255,255,255,0.4)'}]}>
                                <Text style={styles.textDataHead}>CAN-CHI</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.textData}>{StdioDateHelper.convertLunarDayToCanChi(date)}</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.textData}>{StdioDateHelper.convertLunarMonthToCanChi(lunarDate)}</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.textData}>{StdioDateHelper.convertLunarYearToCanChi(lunarDate.lunarYear)}</Text>
                            </View>
                        </View>
                        <View style={styles.dataContainer}>
                            <View style={[styles.data, {backgroundColor: 'rgba(255,255,255,0.4)'}]}>
                                <Text style={styles.textDataHead}>LẠC THƯ HOA GIÁP</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={[styles.textData, {color: StdioDateHelper.getLacThuHoaGiapFromDay(date).color}]}>{StdioDateHelper.getLacThuHoaGiapFromDay(date).text}</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={[styles.textData, {color: StdioDateHelper.getLacThuHoaGiapFromMonth(lunarDate).color}]}>{StdioDateHelper.getLacThuHoaGiapFromMonth(lunarDate).text}</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={[styles.textData, {color: StdioDateHelper.getLacThuHoaGiapFromYear(lunarDate.lunarYear).color}]}>{StdioDateHelper.getLacThuHoaGiapFromYear(lunarDate.lunarYear).text}</Text>
                            </View>
                        </View>
                        <View  style={styles.dataContainer1}>
                            <View style={[styles.data, {backgroundColor: 'rgba(255,255,255,0.4)'}]}>
                                <Text style={styles.textDataHead}>TUỔI KỴ</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.textData}>{tuoiKyFromDay[0]}</Text>
                                <Text style={styles.textData}>{tuoiKyFromDay[1]}</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.textData}>{tuoiKyFromMonth[0]}</Text>
                                <Text style={styles.textData}>{tuoiKyFromMonth[1]}</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.textData}>{tuoiKyFromYear[0]}</Text>
                                <Text style={styles.textData}>{tuoiKyFromYear[1]}</Text>
                            </View>
                        </View>
                        <View  style={styles.dataContainer}>
                            <View style={[styles.data, {backgroundColor: 'rgba(255,255,255,0.4)'}]}>
                                <Text style={styles.textDataHead}>TUỖI HỢP</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.textData}>{StdioDateHelper.getTuoiHopFromDay(date)}</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.textData}>{StdioDateHelper.getTuoiHopFromMonth(lunarDate)}</Text>
                            </View>
                            <View style={styles.data}>
                                <Text style={styles.textData}>{StdioDateHelper.getTuoiHopFromYear(lunarDate.lunarYear)}</Text>
                            </View>
                        </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    courtesy: {
        width: '100%',
        // aspectRatio: 15/9,
    },
    headContainer: {
        width: '100%',
        // flex: 2,
    },
    titleContainer: {
        width: '100%',
        // flex: 3,
    },
    dataContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    dataContainer1: {
        width: '100%',
        flexDirection: 'row',
        // flex: 1,
    },
    dataContainer2: {
        width: '100%',
        // flex: 3,
    },
    head: {
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    textHead: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    title: {
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTitle: {
        color: 'rgba(164,172,193,1)',
        fontSize: 18,
        fontWeight: 'bold',
    },
    data: {
        flex: 1,
        paddingTop: 1,
        paddingBottom: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRightColor: 'rgba(255,255,255,0.3)',
        borderBottomColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    textData: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 12,
        flexWrap: "wrap",
        textAlign: 'center',
    },
    textDataHead: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        flexWrap: "wrap",
        fontSize: 11,
    },
    textData1: {
        fontSize: 12,
        color: 'blue',
        textDecorationLine: 'underline',
        flexWrap: "wrap",
        textAlign: 'center',
    },
});

export default Courtesy;