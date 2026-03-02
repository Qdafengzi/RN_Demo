import React, {useMemo, useRef, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import PagerView, {
    type PagerViewOnPageSelectedEvent,
} from 'react-native-pager-view';
import {useTheme} from '@react-navigation/native';

type PageItem = {
    key: string;
    index: number;
    bg: string;
};

const THUMB_WIDTH = 92;
const THUMB_HEIGHT = 68;
const THUMB_GAP = 8;
const THUMB_ITEM_WIDTH = THUMB_WIDTH + THUMB_GAP;

export const ViewPagerScreen = () => {
    const {colors} = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentIndexRef = useRef(0);
    const previewPagerRef = useRef<PagerView | null>(null);
    const thumbnailListRef = useRef<FlatList<PageItem> | null>(null);

    // 生成 20 个页面的数据（颜色固定随机：组件生命周期内不会变）
    const pages = useMemo<PageItem[]>(() => {
        const randomColor = () =>
            `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
                Math.random() * 256,
            )},${Math.floor(Math.random() * 256)})`;

        return Array.from({length: 100}, (_, i) => ({
            key: String(i),
            index: i,
            bg: randomColor(),
        }));
    }, []);

    const scrollThumbnailToIndex = (index: number) => {
        thumbnailListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5,
        });
    };

    const onPreviewPageSelected = (event: PagerViewOnPageSelectedEvent) => {
        const nextIndex = event.nativeEvent.position;
        if (nextIndex === currentIndexRef.current) {
            return;
        }

        currentIndexRef.current = nextIndex;
        setCurrentIndex(nextIndex);
        scrollThumbnailToIndex(nextIndex);
    };

    const onPressThumbnail = (index: number) => {
        if (index === currentIndexRef.current) {
            scrollThumbnailToIndex(index);
            return;
        }

        currentIndexRef.current = index;
        setCurrentIndex(index);
        previewPagerRef.current?.setPage(index);
        scrollThumbnailToIndex(index);
    };

    return (
        <View style={styles.container}>
            <PagerView
                ref={previewPagerRef}
                style={styles.previewPager}
                initialPage={0}
                onPageSelected={onPreviewPageSelected}
            >
                {pages.map(p => (
                    <View key={p.key} style={[styles.page, {backgroundColor: p.bg}]}>
                        <Text style={[styles.title, {color: colors.text}]}>
                            Photo {p.index + 1}
                        </Text>
                        <Text style={[styles.desc, {color: colors.text}]}>
                            Preview index: {currentIndex}
                        </Text>
                    </View>
                ))}
            </PagerView>

            <View
                style={[
                    styles.thumbnailSection,
                    {borderTopColor: colors.border, backgroundColor: colors.card},
                ]}
            >
                <Text style={[styles.counter, {color: colors.text}]}>
                    Preview index: {currentIndex} | Thumbnail index: {currentIndex}
                </Text>
                <FlatList
                    ref={thumbnailListRef}
                    data={pages}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.key}
                    style={styles.thumbnailList}
                    contentContainerStyle={styles.thumbnailListContent}
                    getItemLayout={(_, index) => ({
                        length: THUMB_ITEM_WIDTH,
                        offset: THUMB_ITEM_WIDTH * index,
                        index,
                    })}
                    onScrollToIndexFailed={({index}) => {
                        thumbnailListRef.current?.scrollToOffset({
                            offset: index * THUMB_ITEM_WIDTH,
                            animated: true,
                        });
                    }}
                    renderItem={({item}) => {
                        const isActive = currentIndex === item.index;
                        return (
                            <Pressable
                                onPress={() => onPressThumbnail(item.index)}
                                style={styles.thumbnailItem}
                            >
                                <View
                                    style={[
                                        styles.thumbnailCard,
                                        {
                                            backgroundColor: item.bg,
                                            borderColor: isActive
                                                ? colors.primary
                                                : 'transparent',
                                        },
                                    ]}
                                >
                                    <Text style={styles.thumbnailText}>
                                        #{item.index + 1}
                                    </Text>
                                </View>
                            </Pressable>
                        );
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    previewPager: {
        flex: 1,
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
    },
    desc: {
        fontSize: 14,
        fontWeight: '500',
    },
    thumbnailSection: {
        borderTopWidth: StyleSheet.hairlineWidth,
        paddingTop: 10,
        paddingBottom: 14,
    },
    counter: {
        textAlign: 'center',
        fontSize: 13,
        fontWeight: '500',
        marginBottom: 8,
    },
    thumbnailList: {
        height: 84,
    },
    thumbnailListContent: {
        paddingHorizontal: 10,
    },
    thumbnailItem: {
        width: THUMB_ITEM_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnailCard: {
        width: THUMB_WIDTH,
        height: THUMB_HEIGHT,
        borderRadius: 8,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnailText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
    },
});
