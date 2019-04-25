import * as React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

import { withRouter } from 'react-router-native';

class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onPressGoBack = this.onPressGoBack.bind(this);
    }

    onPressGoBack() {
        this.props.history.goBack();
    }

    render() {
        return (
            <View style={{ alignContent: 'center', flex: 1, justifyContent: 'center' }}>
                <TextInput
                    placeholder='Username'
                />
                <TextInput
                    placeholder='Password'
                />
                <TextInput
                    placeholder='Re enter password'
                />
                <TouchableOpacity>
                    <Text>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPressGoBack}>
                    <Text>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }
};
    
export default withRouter(RegisterScreen);
    