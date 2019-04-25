import React from 'react';
import { connect } from 'react-redux';
import { Modal, TouchableOpacity, View, StyleSheet, Text, TextInput } from 'react-native';
import { bindDialogActions } from '../redux/actions/dialog';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    courtesy: {
        width: '100%',
        aspectRatio: 10/9,
    },
    headContainer: {
        width: '100%',
        flex: 4,
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
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textHead: {
        color: 'red',
        fontSize: 25,
        fontWeight: 'bold',
    },
    title: {
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    data: {
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textData: {
        fontSize: 12,
    },
    textData1: {
        fontSize: 12,
        color: 'blue',
        textDecorationLine: 'underline'
    },
});

class Courtesy extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.courtesy}>
                <Grid>
                    <Row style={styles.headContainer}>
                        <Col style={styles.head}>
                            <Text style={styles.textHead}>Lịch lý học đông phương</Text>
                        </Col>
                    </Row>
                    <Row style={styles.titleContainer}>
                        <Col style={styles.title}>
                            <Text style={styles.textTitle}>Ngày Thiên hình Hắc đạo</Text>
                            <Text style={styles.textTitle}>Trực Trừ, Sao Tất, Tiết Xuân phân</Text>
                        </Col>
                    </Row>
                    <Row style={styles.dataContainer}>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Lịch</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Ngày</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Tháng</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Năm</Text>
                        </Col>
                    </Row>
                    <Row style={styles.dataContainer}>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Thứ Hai</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>1</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>4</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>2019</Text>
                        </Col>
                    </Row>
                    <Row style={styles.dataContainer}>
                        <Col style={styles.data}>
                            <TouchableOpacity>
                                <Text style={styles.textData1}>Lịch dịch lý học</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>26</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Hai</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Kỷ Hợi</Text>
                        </Col>
                    </Row>
                    <Row style={styles.dataContainer}>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Can chi</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Mậu Thìn</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Đinh Mão</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Kỷ Hợi</Text>
                        </Col>
                    </Row>
                    <Row style={styles.dataContainer}>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Lạc thư hoa giáp</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Đại lâm mộc</Text>
                        </Col>
                        <Col style={styles.data}>
                            <TouchableOpacity>
                                <Text style={styles.textData1}>Tuyền trung thuỷ</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Bình địa mộc</Text>
                        </Col>
                    </Row>
                    <Row  style={styles.dataContainer1}>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Tuổi kỵ</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Mậu Tuất</Text>
                            <Text style={styles.textData}>Giáp Tuất</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Đinh Dậu</Text>
                            <Text style={styles.textData}>Quý Dậu</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Kỷ Tỵ</Text>
                            <Text style={styles.textData}>Ất Tỵ</Text>
                        </Col>
                    </Row>
                    <Row  style={styles.dataContainer}>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Tuổi hợp</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Quý Dậu</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Nhâm Tuất</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Giáp Dần</Text>
                        </Col>
                    </Row>
                    <Row style={styles.dataContainer}>

                    </Row>
                    <Row style={styles.dataContainer}>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Cát thần</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Hung thần sát</Text>
                        </Col>
                    </Row>
                    <Row style={styles.dataContainer2}>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Thiên phúc, U vi tinh, Thiên ân,</Text>
                        </Col>
                        <Col style={styles.data}>
                            <Text style={styles.textData}>Thụ tử, Nguyệt hỏa, Phủ đầu sát, Tam tang, Không phòng, Thiên hình, Ly sào, Xích khẩu</Text>
                        </Col>
                    </Row>
                </Grid>
            </View>
        );
    }
}

export default Courtesy;