import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../theme/ThemeContext';
import React, {useEffect, useState} from 'react';
import {FlashList} from '@shopify/flash-list';

interface ListItemProps {
    id: string;
    title: string;
}

const ListItem: React.FC<ListItemProps> = (item) => (
    <View style={styles.itemBox}>
        <Text style={styles.item}>
            {item.title}
        </Text>
    </View>
);

export const ListDetailScreen: React.FC = () => {
    const {colors} = useTheme();
    const [listData, setListData] = useState<ListItemProps[]>([]);

    useEffect(() => {
        let list = [];
        for (let i = 0; i < 300; i++) {
            const item: ListItemProps = {
                id: i.toString(),
                title: `Item ${i}`,
            };
            list.push(item);
        }
        setListData(list);
    }, []);

    return (
        <View style={[styles.detailContainer, {backgroundColor: colors.background}]}>
            <FlashList
                style={styles.listBox}
                data={listData}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <ListItem {...item} />}
                estimatedItemSize={200}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
    },
    listBox:{
        flex: 1,
        width: '100%',
    },
    itemBox: {
        height: 60,
        backgroundColor: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    item: {
        color: '#fff',
        width: '100%',
        marginLeft: 10,
    },
});
