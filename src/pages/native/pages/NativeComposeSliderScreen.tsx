import {Button, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {usePageReport} from '../../../hooks/usePageReport';
import {useState} from 'react';
import React from 'react';
import {Text} from 'react-native-gesture-handler';
import RTNSliderNativeComponent from '../../../../specs/RTNComposeSliderNativeComponent.ts';

export const NativeComposeSliderScreen = () => {
    const {colors} = useTheme();
    usePageReport('ButtonDetailScreen');
    const [progress, setProgress] = useState(0);

    return (
        <View style={styles.detailContainer}>
            <Text style={styles.text}>{progress}</Text>

            <RTNSliderNativeComponent
                style={styles.slider}
                max={100}
                min={0}
                value={progress}
                text={'Zoom'}
                onProgress={(e) => {
                    setProgress(e.nativeEvent.progress);
                    console.log('value changed', e.nativeEvent.progress);
                }}/>

            <Button
                title="change"
                onPress={() => {
                    //要是一个整数
                    setProgress(Math.floor(Math.random() * 100));
                }}
            />

        </View>
    );

};

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    slider: {
        width: '100%',
        height: 100,
        marginTop: 10,
        marginBottom: 10,
    },
    text:{
        marginTop: 20,
        color: 'white',
    },
});
