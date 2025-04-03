import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../../theme/ThemeContext';
import {usePageReport} from '../../../hooks/usePageReport';
import React from 'react';

export const ButtonDetailScreen: React.FC = () => {
    const {colors} = useTheme();
    const {reportEvent} = usePageReport('ButtonDetailScreen');
    return (
        <View style={[styles.detailContainer, {backgroundColor: colors.background}]}>
            <Text style={{color: colors.text, fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>按钮组件详情</Text>
            <TouchableOpacity onPress={() => {
                reportEvent('button_click', {button_name: '计数按钮', counter: '1'});
            }} style={styles.button}>
                <Text style={styles.buttonText}>基础按钮</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#007AFF'}]}>
                <Text style={[styles.buttonText, {color: 'white'}]}>主要按钮</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#FF3B30'}]}>
                <Text style={[styles.buttonText, {color: 'white'}]}>危险按钮</Text>
            </TouchableOpacity>
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
