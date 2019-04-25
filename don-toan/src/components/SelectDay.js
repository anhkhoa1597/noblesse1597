import React from 'react';
import { connect } from 'react-redux';
import { Modal, TouchableOpacity, View, StyleSheet, Text, TextInput } from 'react-native';
import { bindDialogActions } from '../redux/actions/dialog';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    slectDay: {
        flexDirection: 'row'
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        width: 30,
        height: 18,
        fontSize: 12,
        marginLeft: 2,
        marginRight: 2,
    },
    year: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        width: 40,
        height: 18,
        fontSize: 12,
        marginLeft: 2,
        marginRight: 2,
    },
    btn: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        width: 80,
        height: 18,
        borderRadius: 5,
        marginLeft: 5,
    }
});

class SelectDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: '',
            month: '',
            year: '',
        }
    }

    render() {
        const { day, month, year } = this.state;
        return (
            <View style={styles.slectDay}>
                <Text>Dương lịch: Ngày</Text>
                <TextInput
                    style={styles.input}
                    value={day}
                    onChangeText={(day) => this.setState({day})}
                    selectionColor ='white'
                />
                <Text>Tháng</Text>
                <TextInput
                    style={styles.input}
                    value={month}
                    onChangeText={(month) => this.setState({month})}
                    selectionColor ='white'
                />
                <Text>Năm</Text>
                <TextInput
                    style={styles.year}
                    value={year}
                    onChangeText={(year) => this.setState({year})}
                    selectionColor ='white'
                />
                <TouchableOpacity>
                    <View style={styles.btn}>
                        <Text>Xem Ngày</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SelectDay;