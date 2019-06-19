import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StdioDateHelper } from '../helper/StdioDateHelper';
import { StdioLunarDate } from '../helper/StdioLunarDate';


class Time extends React.Component {
    constructor(props) {
        super(props);
        Text.defaultProps = Text.defaultProps || {};
        Text.defaultProps.allowFontScaling = false;
    }
    render() {
        const { date } = this.props;
        let lunarDate = StdioDateHelper.convertSolarToLunar(date, 7.0);
        return (
            <View style={styles.time}>
                    <View style={styles.row}>
                        <View style={[styles.col, {backgroundColor: 'rgba(255,255,255,0.4)'}]}>
                            <Text style={styles.textTitle}>GIỜ</Text>
                        </View>
                        <View style={[styles.col1, {backgroundColor: 'rgba(255,255,255,0.4)'}]}>
                            <Text style={styles.textTitle}>Vòng Hoàng Đạo</Text>
                        </View>
                        <View style={[styles.col1, {backgroundColor: 'rgba(255,255,255,0.4)'}]}>
                            <Text style={styles.textTitle}>QUẺ</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.text}>Tí (23h - 1h)</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getHoangDaoForHour(date, 1).color}]}>{StdioDateHelper.getHoangDaoForHour(date, 1).text}</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 1).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 1).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 1).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 1).text}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.text}>Sửu (1h - 3h)</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getHoangDaoForHour(date, 2).color}]}>{StdioDateHelper.getHoangDaoForHour(date, 2).text}</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 2).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 2).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 2).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 2).text}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.text}>Dần (3h - 5h)</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getHoangDaoForHour(date, 3).color}]}>{StdioDateHelper.getHoangDaoForHour(date, 3).text}</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 3).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 3).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 3).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 3).text}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.text}>Mão (5h - 7h)</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getHoangDaoForHour(date, 4).color}]}>{StdioDateHelper.getHoangDaoForHour(date, 4).text}</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 4).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 4).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 4).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 4).text}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.text}>Thìn (7h - 9h)</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getHoangDaoForHour(date, 5).color}]}>{StdioDateHelper.getHoangDaoForHour(date, 5).text}</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 5).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 5).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 5).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 5).text}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.text}>Tỵ (9h - 11h)</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getHoangDaoForHour(date, 6).color}]}>{StdioDateHelper.getHoangDaoForHour(date, 6).text}</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 6).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 6).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 6).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 6).text}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.text}>Ngọ (11h - 13h)</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getHoangDaoForHour(date, 7).color}]}>{StdioDateHelper.getHoangDaoForHour(date, 7).text}</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 7).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 7).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 7).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 7).text}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.text}>Mùi (13h - 15h)</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getHoangDaoForHour(date, 8).color}]}>{StdioDateHelper.getHoangDaoForHour(date, 8).text}</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 8).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 8).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 8).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 8).text}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.text}>Thân (15h - 17h)</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getHoangDaoForHour(date, 9).color}]}>{StdioDateHelper.getHoangDaoForHour(date, 9).text}</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 9).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 9).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 9).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 9).text}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.text}>Dậu (17h - 19h)</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getHoangDaoForHour(date, 10).color}]}>{StdioDateHelper.getHoangDaoForHour(date, 10).text}</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 10).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 10).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 10).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 10).text}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.text}>Tuất (19h - 21h)</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getHoangDaoForHour(date, 11).color}]}>{StdioDateHelper.getHoangDaoForHour(date, 11).text}</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 11).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 11).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 11).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 11).text}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.text}>Hợi (21h - 23h)</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getHoangDaoForHour(date, 12).color}]}>{StdioDateHelper.getHoangDaoForHour(date, 12).text}</Text>
                        </View>
                        <View style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 12).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 12).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 12).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 12).text}</Text>
                        </View>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    time: {
        marginTop: 15,
        width: '100%',
        aspectRatio: 3/2,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
    },
    col: {
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
    col1: {
        flexDirection: 'row',
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
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    text1: {
        color: 'white',
        fontSize: 12,
    },
    textTitle: {
        color: 'white',
        fontSize: 12,
        fontWeight:'bold',
    }
})

export default Time;