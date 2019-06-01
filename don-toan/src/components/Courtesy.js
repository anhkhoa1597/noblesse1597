import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
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
                <Grid>
                    {/* <Row style={styles.headContainer}>
                        <Col style={styles.head}>
                            <Text style={styles.textHead}>CHI TIẾT</Text>
                        </Col>
                    </Row> */}
                    {/* <Row style={styles.titleContainer}>
                        <Col style={styles.title}>
                            <Text style={styles.textTitle}>Ngày Thiên hình Hắc đạo</Text>
                            <Text style={styles.textTitle}>Trực Trừ, Sao Tất, Tiết Xuân phân</Text>
                        </Col>
                    </Row> */}
                    <Row style={styles.dataContainer}>
                        <Col style={styles.data}>
                            <Text style={styles.textDataHead}>Lịch</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textDataHead}>Ngày</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textDataHead}>Tháng</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textDataHead}>Năm</Text>
                        </Col>
                    </Row>
                    <Row style={styles.dataContainer}>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>{StdioDateHelper.getDayOfWeekFromDate(date)}</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>{date.day}</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>{date.month}</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>{date.year}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.dataContainer}>
                        <Col style={styles.data}>
                            <Text style={styles.textDataHead}>Lịch dịch lý học</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>{lunarDate.lunarDay}</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>{StdioDateHelper.convertLunarMonthToString(lunarDate.lunarMonth, lunarDate.lunarLeap)}</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>{lunarDate.lunarYear}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.dataContainer}>
                        <Col style={styles.data}>
                            <Text style={styles.textDataHead}>Can-Chi</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>{StdioDateHelper.convertLunarDayToCanChi(date)}</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>{StdioDateHelper.convertLunarMonthToCanChi(lunarDate)}</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>{StdioDateHelper.convertLunarYearToCanChi(lunarDate.lunarYear)}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.dataContainer}>
                        <Col style={styles.data}>
                            <Text style={styles.textDataHead}>Lạc thư hoa giáp</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={{fontSize: 11, color: StdioDateHelper.getLacThuHoaGiapFromDay(date).color}}>{StdioDateHelper.getLacThuHoaGiapFromDay(date).text}</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={{fontSize: 11, color: StdioDateHelper.getLacThuHoaGiapFromMonth(lunarDate).color}}>{StdioDateHelper.getLacThuHoaGiapFromMonth(lunarDate).text}</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={{fontSize: 11, color: StdioDateHelper.getLacThuHoaGiapFromYear(lunarDate.lunarYear).color}}>{StdioDateHelper.getLacThuHoaGiapFromYear(lunarDate.lunarYear).text}</Text>
                        </Col>
                    </Row>
                    <Row  style={styles.dataContainer1}>
                        <Col style={styles.data}>
                            <Text style={styles.textDataHead}>Tuổi kỵ</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>{tuoiKyFromDay[0]}</Text>
                            <Text style={styles.textData}>{tuoiKyFromDay[1]}</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>{tuoiKyFromMonth[0]}</Text>
                            <Text style={styles.textData}>{tuoiKyFromMonth[1]}</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>{tuoiKyFromYear[0]}</Text>
                            <Text style={styles.textData}>{tuoiKyFromYear[1]}</Text>
                        </Col>
                    </Row>
                    <Row  style={styles.dataContainer}>
                        <Col style={styles.data}>
                            <Text style={styles.textDataHead}>Tuổi hợp</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>{StdioDateHelper.getTuoiHopFromDay(date)}</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>{StdioDateHelper.getTuoiHopFromMonth(lunarDate)}</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>{StdioDateHelper.getTuoiHopFromYear(lunarDate.lunarYear)}</Text>
                        </Col>
                    </Row>
                    {/* <Row style={styles.dataContainer}>

                    </Row>
                    <Row style={styles.dataContainer}>
                        <Col style={styles.data}>
                            <Text style={styles.textDataHead}>Cát thần</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textDataHead}>Hung thần sát</Text>
                        </Col>
                    </Row>
                    <Row style={styles.dataContainer2}>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Thiên phúc, U vi tinh, Thiên ân,</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Thụ tử, Nguyệt hỏa, Phủ đầu sát, Tam tang, Không phòng, Thiên hình, Ly sào, Xích khẩu</Text>
                        </Col>
                    </Row> */}
                </Grid>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    courtesy: {
        width: '100%',
        aspectRatio: 15/9,
    },
    headContainer: {
        width: '100%',
        flex: 2,
    },
    titleContainer: {
        width: '100%',
        flex: 3,
    },
    dataContainer: {
        width: '100%',
        flex: 1,
    },
    dataContainer1: {
        width: '100%',
        flex: 2,
    },
    dataContainer2: {
        width: '100%',
        flex: 3,
    },
    head: {
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
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
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    textData: {
        color: 'white',
        fontSize: 12,
    },
    textDataHead: {
        color: 'rgba(164,172,193,1)',
        fontWeight: 'bold',
        fontSize: 12,
    },
    textData1: {
        fontSize: 12,
        color: 'blue',
        textDecorationLine: 'underline'
    },
});

export default Courtesy;