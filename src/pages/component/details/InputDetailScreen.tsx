import {StyleSheet, TextInput, View} from 'react-native';
import {useTheme} from '../../../theme/ThemeContext';
import React, {useState} from 'react';

export const InputDetailScreen: React.FC = () => {
    const {colors} = useTheme();
    const [content, setContent] = useState('');
    return (
        <View style={[styles.detailContainer, {backgroundColor: colors.background}]}>
            <TextInput
                placeholder={'请输入内容'}
                value={content}
                onChangeText={setContent}
                style={styles.input}/>

            <TextInput
                placeholder={'请输入内容1'}
                value={content}
                onChangeText={setContent}
                editable={true}
                style={styles.input}/>
        </View>
    );
};


const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    input: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
