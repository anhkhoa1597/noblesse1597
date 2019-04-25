import * as React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { withRouter } from 'react-router-native';
import { routes } from '../../config/routes';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.onPressLogin = this.onPressLogin.bind(this);
        this.onPressRegister = this.onPressRegister.bind(this);
    }

    onPressLogin() {
        this.props.history.push(routes.HOME);        
    }

    onPressRegister() {
        this.props.history.push(routes.REGISTER);
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
                <TouchableOpacity onPress={this.onPressLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPressRegister}>
                    <Text>Go to Register</Text>
                </TouchableOpacity>
            </View>
        );
    }
};
    
export default withRouter(LoginScreen);
    