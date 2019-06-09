//@flow
import * as React from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';
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
            <ImageBackground source={BACKGROUND} style={styles.background}>
                {/* <View style={{backgroundColor: 'rgb(0,0,0)', flex: 1}}> */}
                    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}}>
                        <Provider store={store} >
                        <>
                            <NativeRouter>
                                <Routes />
                            </NativeRouter>
                            <Dialog />
                        </>
                        </Provider>        
                    </SafeAreaView>
                {/* </View> */}
             </ImageBackground>
        );
    }
};

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
})
    
export default App;
    