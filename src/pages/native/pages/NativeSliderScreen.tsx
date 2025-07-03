import { Button, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { usePageReport } from '../../../hooks/usePageReport';
import RTNSliderNativeComponent from '../../../../specs/RTNSliderNativeComponent';
import { useState } from 'react';
import React from 'react';
import { Text } from 'react-native-gesture-handler';
import FastImage from "@d11/react-native-fast-image";

export const NativeSliderScreen = () => {
    const { colors } = useTheme();
    usePageReport('ButtonDetailScreen');
    const [progress, setProgress] = useState(0);

    return (
        <View style={[styles.detailContainer, { backgroundColor: colors.background }]}>
            <Text style={{ marginTop: 20, color: colors.text }}>{progress}</Text>

            <RTNSliderNativeComponent
                style={{ width: '100%', height: 20, marginTop: 10 }}
                max={100}
                min={0}
                value={progress}
                onProgress={(e) => {
                    setProgress(e.nativeEvent.progress);
                    console.log('value changed', e.nativeEvent.progress);
                }}
            />

            <Button
                title="change"
                onPress={() => {
                    //要是一个整数
                    setProgress(Math.floor(Math.random() * 100));
                }}
            />

            <FastImage
                style={{width:20,height:20}}
                defaultSource={require('../../../assets/images/ic_home.png')}
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
});
