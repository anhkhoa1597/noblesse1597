import * as React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindHeaderBarActions } from '../../../redux/actions/headerbar';
import Calendar from '../../../components/Calendar'
import SelectDay from '../../../components/SelectDay'
import Courtesy from '../../../components/Courtesy'
import Time from '../../../components/Time'
import Hint from '../../../components/Hint'
const styles = StyleSheet.create({
    margin5: {
        margin: 5,
    }
})

class ProfileScreen extends React.Component {
    componentDidMount() {
        this.props.headerBarActions.setTitle("PROFILE");
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.margin5}><Calendar></Calendar></View>
                <View style={styles.margin5}><SelectDay></SelectDay></View>
                <View style={styles.margin5}><Courtesy></Courtesy></View>
                <View style={styles.margin5}><Time></Time></View>
                <View style={styles.margin5}><Hint></Hint></View>
            </ScrollView>
        );
    }
};

export default connect(null, 
    dispatch => bindHeaderBarActions({}, dispatch)
)(ProfileScreen);