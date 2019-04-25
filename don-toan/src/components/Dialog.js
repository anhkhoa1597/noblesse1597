import React from 'react';
import { connect } from 'react-redux';
import { Modal, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { bindDialogActions } from '../redux/actions/dialog';

const styles = StyleSheet.create({
    dialogBackground: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    dialogContainer: {
        width: 300,
        height: 200,
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#fff'
    }
});

class Dialog extends React.Component {

    renderAlert() {
        const { dialogActions } = this.props;
        const { alertVisible } = this.props.dialog;
        const { title, message } = this.props.dialog.data;

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={alertVisible}
                onRequestClose={dialogActions.hide}>

                <View style={styles.dialogBackground}>
                    <View style={styles.dialogContainer}>
                        <Text style={{ fontSize: 20 }}>{ title }</Text>
                        <Text>{ message }</Text>

                        <TouchableOpacity
                            onPress={() => setTimeout(dialogActions.hide, 10) }>
                            <Text>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    renderConfirm() {
        const { dialogActions } = this.props;
        const { confirmVisible } = this.props.dialog;
        const { title, message, confirmCallback } = this.props.dialog.data;

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={confirmVisible}
                onRequestClose={dialogActions.hide}>

                <View style={styles.dialogBackground}>
                    <View style={styles.dialogContainer}>
                        <Text style={{ fontSize: 20 }}>{ title }</Text>
                        <Text>{ message }</Text>

                        <TouchableOpacity
                            onPress={() => { setTimeout(dialogActions.hide, 10); confirmCallback(); }}>
                            <Text>OK</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setTimeout(dialogActions.hide, 10) }>                            
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    render() {
        return (
            <>
            { this.renderAlert() }
            { this.renderConfirm() }
            </>
        );
    }
}

export default connect(
    (state) => ({ dialog: state.dialog }),
    (dispatch) => bindDialogActions({}, dispatch)
)(Dialog);