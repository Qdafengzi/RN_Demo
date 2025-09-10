import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../theme/ThemeContext';
import React from 'react';

/// 定义组件列表数据
const otherList = [
    {id: '1', title: 'useState', route: 'useState'},
    {id: '2', title: 'NativeEvent', route: 'NativeEvent'},
    {id: '3', title: 'ReducerDemo', route: 'ReducerDemo'},
    {id: '4', title: 'ZustandDemo', route: 'ZustandDemo'},

];

// 定义导航参数类型
export type ComponentStackParamList = {
    OtherList: undefined;
    useState: undefined;
    NativeEvent: undefined;
    ReducerDemo: undefined;
    ZustandDemo: undefined;
};


// 组件列表页面
export const OtherListScreen: React.FC<{ navigation: any }> = ({navigation}) => {
    // 获取当前主题颜色
    const {colors} = useTheme();

    // 渲染列表项
    const renderItem = ({item}: { item: { id: string; title: string; route: string } }) => (
        <TouchableOpacity
            style={[styles.card, {backgroundColor: colors.card, borderColor: colors.border}]}
            onPress={() => navigation.navigate(item.route)}
        >
            <Text style={{color: colors.text}}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <Text style={[styles.header, {color: colors.text}]}>Other列表</Text>
            <FlatList
                data={otherList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />
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
