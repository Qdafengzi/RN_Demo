import { Button, Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { FlatList } from 'react-native';

const w = Dimensions.get('window').width;
export const BottomSheetScreen1: React.FC = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    
    // 列表数据
    const [data, setData] = useState([
        { id: '1', title: '列表项 1' },
        { id: '2', title: '列表项 2' },
        { id: '3', title: '列表项 3' },
        { id: '4', title: '列表项 4' },
        { id: '5', title: '列表项 5' },
        { id: '6', title: '列表项 6' },
        { id: '7', title: '列表项 7' },
        { id: '8', title: '列表项 8' },
        { id: '9', title: '列表项 9' },
        { id: '10', title: '列表项 10' },
    ]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // 渲染列表项
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <Button title="Show modal" onPress={toggleModal} />

            <Modal statusBarTranslucent={true} isVisible={isModalVisible} deviceWidth={w} style={{ margin: 0, padding: 0, justifyContent: "flex-end" }} >
                <View style={{ height: '80%', backgroundColor: 'white', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>列表标题</Text>
                    </View>
                    
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContainer}
                    />
                    
                    <Button title="Hide modal" onPress={toggleModal} />
                </View>
            </Modal>
        </View>
    );
};
const h = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        height: h * 0.8
    },
    header: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    listContainer: {
        paddingHorizontal: 15,
    },
    item: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemText: {
        fontSize: 16,
    },
});
