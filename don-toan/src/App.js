//@flow
import * as React from 'react';
import { View, Text } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { Provider } from 'react-redux';

import Routes from './screens/Routes';
import configureStore from './Store';
import Dialog from './components/Dialog';

const store = configureStore({});

type Props = {};
class App extends React.Component<Props> {
    render() {
        return (
            <Provider store={store} >
            <>
            <NativeRouter>
                <Routes />
            </NativeRouter>
            <Dialog />
            </>
            </Provider>
        );
    }
};
    
export default App;
    