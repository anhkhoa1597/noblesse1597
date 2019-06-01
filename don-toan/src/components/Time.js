import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { StdioDateHelper } from '../helper/StdioDateHelper';
import { StdioLunarDate } from '../helper/StdioLunarDate';

class Time extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        const { date } = this.props;
        let lunarDate = StdioDateHelper.convertSolarToLunar(date, 7.0);
        return (
            <View style={styles.time}>
                <Grid>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.textTitle}>Giờ</Text>
                        </Col>
                        {/* <Col style={styles.col1}>
                            <Text style={styles.textTitle}>Vòng Hoàng Đạo</Text>
                        </Col> */}
                        <Col style={styles.col1}>
                            <Text style={styles.textTitle}>Quẻ</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Tí (23h - 1h)</Text>
                        </Col>
                        {/* <Col style={styles.col1}>
                            <Text style={styles.text}>Thiên lao</Text>
                        </Col> */}
                        <Col style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 1).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 1).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 1).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 1).text}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Sửu (1h - 3h)</Text>
                        </Col>
                        {/* <Col style={styles.col1}>
                            <Text style={styles.text}>Tư mệnh</Text>
                        </Col> */}
                        <Col style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 2).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 2).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 2).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 2).text}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Dần (3h - 5h)</Text>
                        </Col>
                        {/* <Col style={styles.col1}>
                            <Text style={styles.text}>Tư mệnh</Text>
                        </Col> */}
                        <Col style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 3).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 3).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 3).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 3).text}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Mão (5h - 7h)</Text>
                        </Col>
                        {/* <Col style={styles.col1}>
                            <Text style={styles.text}>Câu trận</Text>
                        </Col> */}
                        <Col style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 4).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 4).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 4).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 4).text}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Thìn (7h - 9h)</Text>
                        </Col>
                        {/* <Col style={styles.col1}>
                            <Text style={styles.text}>Thanh Long</Text>
                        </Col> */}
                        <Col style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 5).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 5).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 5).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 5).text}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Tỵ (9h - 11h)</Text>
                        </Col>
                        {/* <Col style={styles.col1}>
                            <Text style={styles.text}>Minh Đường</Text>
                        </Col> */}
                        <Col style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 6).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 6).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 6).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 6).text}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Ngọ (11h - 13h)</Text>
                        </Col>
                        {/* <Col style={styles.col1}>
                            <Text style={styles.text}>Thiên hình</Text>
                        </Col> */}
                        <Col style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 7).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 7).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 7).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 7).text}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Mùi (13h - 15h)</Text>
                        </Col>
                        {/* <Col style={styles.col1}>
                            <Text style={styles.text}>Chu Tước</Text>
                        </Col> */}
                        <Col style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 8).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 8).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 8).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 8).text}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Thân (15h - 17h)</Text>
                        </Col>
                        {/* <Col style={styles.col1}>
                            <Text style={styles.text}>Kim quỹ</Text>
                        </Col> */}
                        <Col style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 9).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 9).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 9).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 9).text}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Dậu (17h - 19h)</Text>
                        </Col>
                        {/* <Col style={styles.col1}>
                            <Text style={styles.text}>Bảo Quang</Text>
                        </Col> */}
                        <Col style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 10).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 10).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 10).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 10).text}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Tuất (19h - 21h)</Text>
                        </Col>
                        {/* <Col style={styles.col1}>
                            <Text style={styles.text}>Bạch Hổ</Text>
                        </Col> */}
                        <Col style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 11).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 11).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 11).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 11).text}</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Hợi (21h - 23h)</Text>
                        </Col>
                        {/* <Col style={styles.col1}>
                            <Text style={styles.text}>Ngọc Đường</Text>
                        </Col> */}
                        <Col style={styles.col1}>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonBatMon(lunarDate, 12).color}]}>{StdioDateHelper.getQueFromDonBatMon(lunarDate, 12).text} </Text>
                            <Text style={[styles.text, {color: StdioDateHelper.getQueFromDonLucNham(lunarDate, 12).color}]}>{StdioDateHelper.getQueFromDonLucNham(lunarDate, 12).text}</Text>
                        </Col>
                    </Row>
                    {/* <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text1}>* Giờ Thiên cẩu hạ thực</Text>
                        </Col>
                    </Row> */}
                </Grid>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    time: {
        marginTop: 30,
        width: '100%',
        aspectRatio: 3/2,
    },
    row: {
        width: '100%',
        flex: 1,
    },
    col: {
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        flex: 3,
    },
    col1: {
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        flex: 4,
        flexDirection: 'row',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    col2: {
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        flex: 1,
    },
    text1: {
        fontSize: 12,
    },
    textTitle: {
        fontSize: 12,
    }
})

export default Time;