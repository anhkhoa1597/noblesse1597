import React from 'react';
import { connect } from 'react-redux';
import { Modal, TouchableOpacity, View, StyleSheet, Text, TextInput } from 'react-native';
import { bindDialogActions } from '../redux/actions/dialog';

const styles = StyleSheet.create({
    hint: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'blue',
    },
    title: {
        width: '100%',
        backgroundColor: 'blue',
    },
    textTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    sub: {
        width: '100%',
        backgroundColor: '#d6eef9',
    },
    textSub: {
        color: 'black',
        fontSize: 12,
    },
})

class Hint extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.hint}>
                <View style={styles.title}>
                    <Text style={styles.textTitle}>Giờ Tí</Text>
                </View>
                <View style={styles.sub}>
                    <Text style={styles.textSub}>Từ 11h đêm đến 1h sáng</Text>
                </View>
            </View>
        )
    }
}

export default Hint;