import * as React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindHeaderBarActions } from '../../../redux/actions/headerbar';

class ProfileScreen extends React.Component {
    componentDidMount() {
        this.props.headerBarActions.setTitle("PROFILE");
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Profile Screen</Text>
            </View>
        );
    }
};

export default connect(null, 
    dispatch => bindHeaderBarActions({}, dispatch)
)(ProfileScreen);