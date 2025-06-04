import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../theme/ThemeContext';
import React, {useEffect, useState} from 'react';

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

export const ScrollViewDetailScreen: React.FC = () => {
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

            <ScrollView style={{width:'100%'}}>
                {listData.map((item, index) => {
                    return <ListItem key={index} item={item} />;
                })}
                <Text style={{color: colors.text, fontSize: 20, fontWeight: 'bold'}}>滚动视图详情</Text>


            </ScrollView>
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

    listBox: {
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
