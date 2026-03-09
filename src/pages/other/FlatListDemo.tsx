// FlatListDemo.tsx
import React from 'react';
import {
    View,
    FlatList,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import {imageDataList} from "../../data/Constant.ts";
import XImage from "../component/XImage.tsx";

const GAP = 12;
const SCREEN_W = Dimensions.get('window').width;
const ITEM_W = (SCREEN_W - GAP * 3) / 2; // 左右 padding + 中间间距
const ITEM_H = ITEM_W; // 正方形；你也可以改成固定高度

const FlatListDemo: React.FC = () => {
    return (
        <FlatList
            data={imageDataList}
            keyExtractor={(uri, index) => `${uri}-${index}`}
            numColumns={2}
            contentContainerStyle={styles.list}
            columnWrapperStyle={styles.row}
            renderItem={({ item: uri }) => (
                <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                    <XImage
                        model={{ uri }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: GAP,
        paddingTop: GAP,
        paddingBottom: GAP,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: GAP,
    },
    card: {
        width: ITEM_W,
        height: ITEM_H,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#eee',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default FlatListDemo;
