import {createThemedStyles, useTheme} from '../../theme/ThemeContext';
import {Button, NativeEventEmitter, NativeModules, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-gesture-handler';

const {CommonNativeModule} = NativeModules;


export function NativeEvent(): React.JSX.Element {
    useTheme();
    const styles = useStyles();

    const [message, setMessage] = useState('');


    useEffect(() => {
        const eventEmitter = new NativeEventEmitter(CommonNativeModule);
        const subscription = eventEmitter.addListener('native2RN', (data) => {
            console.log('react 收到原生主动发送的信息 :', data);
            setMessage(`react 收到原生主动发送的信息 : ${JSON.stringify(data)}`);
        });
        return () => subscription.remove();
    }, []);

    const rnSend2Native = () => {
        CommonNativeModule.rnSend2Native('React Native 调用原生');
    };


    const sayHello = () => {
        CommonNativeModule.sayHello(
            (response:any) => {
                console.log('RN  say Hello 后', response);
                setMessage(`RN  say Hello 后 ${response}`);
            },
        );
    };

    const sendMessageToAndroid = () => {
        CommonNativeModule.receivedData(
            {
                userName: 'amit@gmail.com',
                age: '30',
            },
            (response:any) => {
                console.log(response);
                setMessage(response);
            },
        );
    };

    return (
        <View style={styles.screen}>

            <Text>{message}</Text>
            <View style={styles.divider}/>
            <Button title="say Hello" onPress={sayHello}/>
            <View style={styles.divider}/>
            <Button title="send Message To Android" onPress={sendMessageToAndroid}/>
            <View style={styles.divider}/>
            <Button title="rnSend2Native" onPress={rnSend2Native}/>
        </View>
    );
}


const useStyles = createThemedStyles((_) => ({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        height: 20,
    },

    box: {
        marginTop: 10,
        justifyContent: 'center',
        height: 40,
        backgroundColor: 'blue',
    },
    text: {
        color: 'white',
    },
}));
