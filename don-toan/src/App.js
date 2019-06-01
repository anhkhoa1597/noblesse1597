//@flow
import * as React from 'react';
import { View, Text, SafeAreaView,ImageBackground } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { Provider } from 'react-redux';

import Routes from './screens/Routes';
import configureStore from './Store';
import Dialog from './components/Dialog';

import {BACKGROUND} from "../assets"

const store = configureStore({});

type Props = {};
class App extends React.Component<Props> {
    render() {
        return (
            <ImageBackground source={BACKGROUND} style={{width: '100%', height: '100%'}}>
                <SafeAreaView style={{flex: 1}}>
                    <Provider store={store} >
                    <>
                        <NativeRouter>
                            <Routes />
                        </NativeRouter>
                        <Dialog />
                    </>
                    </Provider>        
                </SafeAreaView>
             </ImageBackground>
        );
    }
};
    
export default App;
    