import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, TextInput } from 'react-native';
import  FormModal from '../components/FormModal'
import Courtesy from '../components/Courtesy'
import Time from '../components/Time'

const styles = StyleSheet.create({
    selectDay: {
        padding: 15,
        backgroundColor: 'rgba(11,19,36,1)',
        flexDirection: 'row'
    },
    input: {
        backgroundColor: 'rgba(11,19,36,1)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        width: 30,
        height: 18,
        fontSize: 12,
        marginLeft: 2,
        marginRight: 2,
        color: 'white',
        textAlign: 'center',
    },
    year: {
        color: 'white',
        backgroundColor: 'rgba(11,19,36,1)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        width: 40,
        height: 18,
        fontSize: 12,
        marginLeft: 2,
        marginRight: 2,
        textAlign: 'center',
    },
    btn: {
        color: 'white',
        backgroundColor: 'rgba(11,19,36,1)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        width: 80,
        height: 18,
        borderRadius: 5,
        marginLeft: 15,
    },
    text: {
        color: 'rgba(255,255,255,0.3)',
    },
});

class SelectDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible2: false,
            // day: '',
            // month: '',
            // year: '',
        }
    }
    
    componentDidMount() {
        // this.setState({
        //     day: this.props.day,
        //     month: this.props.month,
        //     year: this.props.year
        // })
    }
    toogleModal2 = () => {
        const { modalVisible2 } = this.state;
        console.log('modalevisible2', modalVisible2)
        this.setState({ modalVisible2: !modalVisible2 });
        console.log('modalevisible2 ~~', modalVisible2)
    };
    render() {
        const { modalVisible2 } = this.state;
        const {day, month, year} = this.props;
        return (
            <View style={styles.selectDay}>
                <Text style={styles.text}>Dương lịch: Ngày</Text>
                <TextInput
                    style={styles.input}
                    value={day}
                    onChangeText={(day) => this.setState({day})}
                    selectionColor ='white'
                    color='white'
                />
                <Text style={styles.text}>Tháng</Text>
                <TextInput
                    style={styles.input}
                    value={month}
                    onChangeText={(month) => this.setState({month})}
                    selectionColor ='white'
                    color='white'
                />
                <Text style={styles.text}>Năm</Text>
                <TextInput
                    style={styles.year}
                    value={year}
                    onChangeText={(year) => this.setState({year})}
                    selectionColor ='white'
                    color='white'
                />
                <TouchableOpacity onPress={this.toogleModal2}>
                    <View style={styles.btn}>
                        <Text style={styles.text}>Xem Ngày</Text>
                    </View>
                </TouchableOpacity>
                <FormModal
                    visible={modalVisible2}
                    toogleModal={this.toogleModal2}
                    height={"100%"}
                    // value={}
                >
                    <Courtesy/>
                    <Time/>
                </FormModal>
            </View>
        );
    }
}

export default SelectDay;