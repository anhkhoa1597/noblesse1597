import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        flex: 1,
    },
    col1: {
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        flex: 4,
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
    },
    col2: {
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'grey',
        flex: 1,
    },
    text1: {
        fontSize: 14,
    },
    textTitle: {
        fontSize: 14,
    }
})

class Time extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.time}>
                <Grid>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.textTitle}>Giờ</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.textTitle}>Vòng Hoàng Đạo</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.textTitle}>Quẻ Lạc Việt Độn Toán</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Tí</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Thiên lao</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Tử Lưu niên</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Dần</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Tư mệnh</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Khai Xích khẩu</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Mão</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Câu trận</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Hưu Tiểu cát</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Thìn</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Thanh Long</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Sinh Vô vong</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Tỵ</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Minh Đường</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Thương Đại an</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Ngọ</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Thiên hình</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Đỗ Lưu niên</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Mùi</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Chu Tước</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Cảnh Tốc hỉ</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Thân</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Kim quỹ</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Tử Xích khẩu</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Dậu</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Bảo Quang</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Kinh Tiểu cát</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Tuất</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Bạch Hổ</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Khai Vô vong</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text}>Hợi</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Ngọc Đường</Text>
                        </Col>
                        <Col style={styles.col1}>
                            <Text style={styles.text}>Hưu Đại an</Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text style={styles.text1}>* Giờ Thiên cẩu hạ thực</Text>
                        </Col>
                    </Row>
                </Grid>
            </View>
        )
    }
}

export default Time;