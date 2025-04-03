import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../theme/ThemeContext';
import React from 'react';

export const TextDetailScreen: React.FC = () => {
    const {colors} = useTheme();
    return (
        <View style={[styles.detailContainer, {backgroundColor: colors.background}]}>
            <Text style={{color: colors.text, fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>文本组件详情</Text>
            <Text style={{color: colors.text, fontSize: 16, marginBottom: 10}}>普通文本</Text>
            <Text style={{color: colors.text, fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>粗体文本</Text>
            <Text style={{color: colors.text, fontSize: 16, fontStyle: 'italic', marginBottom: 10}}>斜体文本</Text>
            <Text style={{
                color: colors.text,
                fontSize: 16,
                textDecorationLine: 'underline',
                marginBottom: 10,
            }}>下划线文本</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 16,
        textAlign: 'center',
    },
    listContainer: {
        padding: 16,
    },
    card: {
        padding: 16,
        margin: 8,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
    },
    detailContainer: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 8,
        marginVertical: 8,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
    },
});
