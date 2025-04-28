import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import React from 'react';
import WebViewNativeComponent from '../../../specs/WebViewNativeComponent';
import CenteredTextNativeComponent from '../../../specs/CenteredTextNativeComponent';

export function NativeScreen(): React.JSX.Element {
    const { colors } = useTheme();
    return (
        <View style={styles.screen}>
            <Text style={{ color: colors.primary }}>
                Native content
            </Text>
            <WebViewNativeComponent 
                style={{width:'50%',height:400}}
                sourceURL='www.baidu.com'
                onScriptLoaded={() => {
                    console.log('script loaded');
                }}
            />
            
            <CenteredTextNativeComponent text ="原生控件"  style={{width:200,height:50}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
