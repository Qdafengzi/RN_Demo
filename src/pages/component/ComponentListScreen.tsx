import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import React from 'react';

/// 定义组件列表数据
const componentList = [
    { id: '1', title: '按钮组件', route: 'ButtonDetail' },
    { id: '2', title: '文本组件', route: 'TextDetail' },
    { id: '3', title: '输入框组件', route: 'InputDetail' },
    { id: '4', title: '列表组件1', route: 'ListDetail1' },
    { id: '9', title: '列表组件2', route: 'ListDetail2' },
    { id: '10', title: '列表组件3', route: 'ListDetail3' },
    { id: '11', title: '列表组件4', route: 'ListDetail4' },
    { id: '12', title: '列表组件5', route: 'ListDetail5' },
    { id: '5', title: '图片组件', route: 'ImageDetail' },
    { id: '6', title: '导航组件', route: 'NavigationDetail' },
    { id: '7', title: '弹窗组件', route: 'ModalDetail' },
    { id: '8', title: '滚动视图', route: 'ScrollViewDetail' },
    { id: '13', title: 'BottomSheet', route: 'BottomSheetScreen' },
    { id: '14', title: 'BottomSheet1', route: 'BottomSheetScreen1' },
    { id: '15', title: 'PullToRefresh', route: 'PullToRefresh' },
];

// 定义导航参数类型
export type ComponentStackParamList = {
    ComponentList: undefined;
    ButtonDetail: undefined;
    TextDetail: undefined;
    InputDetail: undefined;
    ListDetail1: undefined;
    ListDetail2: undefined;
    ListDetail3: undefined;
    ListDetail4: undefined;
    ListDetail5: undefined;
    ImageDetail: undefined;
    NavigationDetail: undefined;
    ModalDetail: undefined;
    ScrollViewDetail: undefined;
    BottomSheetScreen: undefined;
    BottomSheetScreen1: undefined;
    PullToRefresh: undefined;
};


// 组件列表页面
export const ComponentListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    // 获取当前主题颜色
    const { colors } = useTheme();

    // 渲染列表项
    const renderItem = ({ item }: { item: { id: string; title: string; route: string } }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => navigation.navigate(item.route)}
        >
            <Text style={{ color: colors.text }}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.header, { color: colors.text }]}>组件列表</Text>
            <FlatList
                data={componentList}
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
