import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { bindDialogActions } from '../../../redux/actions/dialog';

class DialogTab extends React.Component {
    constructor(props) {
        super(props);

        this.onPressShowAlert = this.onPressShowAlert.bind(this);
        this.onPressShowConfirm = this.onPressShowConfirm.bind(this);
    }

    onPressShowAlert() {
        this.props.dialogActions.showAlert("Alert title", "Alert content");
    }

    onPressShowConfirm() {
        this.props.dialogActions.showConfirm("Confirm", "Are you sure?", () => {
            console.log("Sure confirm");
        });
    }

    render() {
        return (
            <View style={{ backgroundColor: '#ffcc99', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this.onPressShowAlert}>
                    <Text>Show Alert</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPressShowConfirm}>
                    <Text>Show Confirm</Text>
                </TouchableOpacity>
            </View>
        )
    }
};

export default connect(
    null,
    dispatch => bindDialogActions({}, dispatch)
)(DialogTab);