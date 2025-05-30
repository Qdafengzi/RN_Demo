import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../theme/ThemeContext';
import React from 'react';

/// 定义组件列表数据
const nativeList = [
    {id: '1', title: 'Native text', route: 'TextScreen'},
    {id: '2', title: 'WebView', route: 'WebViewScreen'},
    {id: '3', title: 'Slider', route: 'SliderScreen'},
    {id: '4', title: 'SliderCompose', route: 'SliderComposeScreen'},
    {id: '5', title: 'PullToRefreshPage', route: 'PullToRefreshPage'},
];

// 定义导航参数类型
export type NativeStackParamList = {
    NativeList: undefined;
    TextScreen: undefined;
    WebViewScreen: undefined;
    SliderScreen: undefined;
    SliderComposeScreen: undefined;
    PullToRefreshPage: undefined;
};


// 组件列表页面
export const NativeListScreen: React.FC<{ navigation: any }> = ({navigation}) => {
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
            <Text style={[styles.header, {color: colors.text}]}>Native列表</Text>
            <FlatList
                data={nativeList}
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
