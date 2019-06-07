import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Picker } from 'react-native';
import { connect } from 'react-redux';
import { bindHeaderBarActions } from '../../redux/actions/headerbar';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import Courtesy from '../../components/Courtesy'
import Time from '../../components/Time'
import { withRouter } from 'react-router-native';


class DetailScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            queDonLucNham : '',
            queDonBatMon : ''
        }
    }

    goToHintScreen = () => {
        if (this.state.queDonBatMon == '' | this.state.queDonLucNham == ''){

        }
        else {
            this.props.history.push({
                pathname: "/hint",
                queDonBatMon: this.state.queDonBatMon,
                queDonLucNham: this.state.queDonLucNham,
            });
        }
    }

    render() {
        const data = this.props.location.state;
        return (
        <View style={styles.contain}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => this.props.history.goBack()} style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Icon
                        style={styles.leftIcon}
                        name="angle-left"
                        color="rgba(164,172,193,1)"
                        size={35}
                    />
                </TouchableOpacity>
                <View style={[styles.center, {flex: 1}]}>
                    <Text style={[styles.text, {fontSize: 18}]}>CHI TIẾT</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}> 
                </View>
            </View>
            <Courtesy date={data}/>
            <Time date={data}/>
            <View style={styles.hint}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Bát Môn...',
                        value: null,
                    }}
                    useNativeAndroidPickerStyle={false}
                    items={[
                        {
                            label: 'Sinh',
                            value: 'Sinh',
                        },
                        {
                            label: 'Thương',
                            value: 'Thương',
                        },
                        {
                            label: 'Đỗ',
                            value: 'Đỗ',
                        },
                        {
                            label: 'Cảnh',
                            value: 'Cảnh',
                        },
                        {
                            label: 'Tử',
                            value: 'Tử',
                        },
                        {
                            label: 'Kinh',
                            value: 'Kinh',
                        },
                        {
                            label: 'Khai',
                            value: 'Khai',
                        },
                        {
                            label: 'Hưu',
                            value: 'Hưu',
                        },
                    ]}
                    onValueChange={(value) => {
                        this.setState({
                            queDonBatMon: value,
                        });
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.queDonBatMon}
                />
                <RNPickerSelect
                    placeholder={{
                        label: 'Lục Nhâm...',
                        value: null,
                    }}
                    useNativeAndroidPickerStyle={false}
                    items={[
                        {
                            label: 'Đại an',
                            value: 'Đại an',
                        },
                        {
                            label: 'Lưu niên',
                            value: 'Lưu niên',
                        },
                        {
                            label: 'Tốc Hỷ',
                            value: 'Tốc Hỷ',
                        },
                        {
                            label: 'Xích Khẩu',
                            value: 'Xích Khẩu',
                        },
                        {
                            label: 'Tiểu Cát',
                            value: 'Tiểu Cát',
                        },
                        {
                            label: 'Vô Vong',
                            value: 'Vô Vong',
                        },
                    ]}
                    onValueChange={(value) => {
                        this.setState({
                            queDonLucNham: value,
                        });
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.queDonLucNham}
                />
                <TouchableOpacity style={styles.hintTouch} onPress={() => this.goToHintScreen()}>
                    <Text style={{fontSize:14, fontWeight:'bold', color:'white'}}>Tra Cứu</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
};

const styles = StyleSheet.create({
    contain: {
        alignItems: 'center',        
        flex: 1
    },
    header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 10,
        marginRight: 10,
        fontWeight: 'bold',
        color: '#fff',
    },
    leftIcon: {
        width: 15,
        height: 30,
        padding: 0,
        marginLeft: 15,
    },
    pickerDonBatMon: {
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 1,
        marginTop: 15,
    },
    hint: {
        flexDirection: 'row',
    },
    hintTouch: {
        marginTop: 15,
        width: 100,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 1,
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginTop: 15,
        marginRight: 5,
        height: 30,
        fontSize: 14,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        // borderRadius: 15,
        backgroundColor: 'white',
        color: 'black',
    },
    inputAndroid: {
        marginTop: 15,
        marginRight: 5,
        height: 30,
        width: 100,
        fontSize: 14,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        backgroundColor: 'white',
        color: 'black',
    }
});

export default withRouter(connect(null, 
    dispatch => bindHeaderBarActions({}, dispatch)
)(DetailScreen));
