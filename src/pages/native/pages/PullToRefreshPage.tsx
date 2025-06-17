import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {usePageReport} from '../../../hooks/usePageReport';
import React, {useEffect, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {PullToRefresh} from '../../../component/pulltorefresh/PullToRefresh';


// 定义列表项的数据结构
interface ListItem {
    id: string;
    title: string;
}

export const PullToRefreshPage: React.FC = () => {
    const {colors} = useTheme();
    const {reportEvent} = usePageReport('PullToRefreshPage');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);

    const [list, setList] = useState<ListItem[]>([]);

    function initData() {
        setIsRefreshing(true);
        const DATA: ListItem[] = [
            {id: '1', title: 'Item 1'},
            {id: '2', title: 'Item 2'},
            {id: '3', title: 'Item 3'},
            {id: '4', title: 'Item 4'},
            {id: '5', title: 'Item 5'},
            {id: '6', title: 'Item 6'},
            {id: '7', title: 'Item 7'},
            {id: '8', title: 'Item 8'},
            {id: '9', title: 'Item 9'},
            {id: '10', title: 'Item 10'},
        ];

        setTimeout(() => {
            setIsRefreshing(false);
            setList(DATA);
        }, 1000);
    }

    useEffect(() => {
        initData();
    }, []);



    // 列表项组件
    const Item = ({title}: { title: string }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    function refresh() {
        initData();
    }

    const generateRandomItem = (index: number): ListItem => ({
        id: `${Date.now()}-${Math.random()}`,
        title: `Item ${index}`,
    });

    function loadMore() {
        setIsLoadMore(true);
        const newItems: ListItem[] = [];
        const lastIndex = list.length + 1;
        // 生成 5 条新数据
        for (let i = 0; i < 5; i++) {
            newItems.push(generateRandomItem(lastIndex + i));
        }
        setTimeout(() => {
            setIsLoadMore(false);
            setList([...list, ...newItems]);
        }, 300);
    }

    return (
        <View style={[styles.detailContainer, {backgroundColor: colors.background}]}>
            <PullToRefresh
                style={styles.listBox}
                isLoadMore={isLoadMore}
                isRefreshing={isRefreshing}
                onRefresh={refresh}
                onLoadMore={loadMore}
                children={
                    <FlashList
                        style={{flexGrow:1,flex:1,height:'auto'}}
                        contentContainerStyle={{padding:0}}
                        // style={{flex:1,backgroundColor:'red'}}
                        nestedScrollEnabled={true}
                        data={list}
                        renderItem={({item}) => <Item title={item.title}/>}
                        keyExtractor={item => item.id}
                    />
                }
            />
        </View>
    );

};

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        alignItems: 'center',
    },

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    item: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        color: '#333',
    },
    listBox: {
        width: '100%',
        flex: 1,
        backgroundColor:'green',
    },
});
