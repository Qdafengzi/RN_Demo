import React, {useMemo, useRef, useState} from "react";
import {Button, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {DataProvider, LayoutProvider, RecyclerListView} from "recyclerlistview";
import XImage from "../component/XImage.tsx";
import {ScrollEvent, ScrollViewDefaultProps} from "recyclerlistview/src/core/scrollcomponent/BaseScrollView.tsx";
import {imageDataList} from "../../data/Constant.ts";
import {WINDOW_WIDTH} from "@gorhom/bottom-sheet";
import {OnRecreateParams} from "recyclerlistview/src/core/RecyclerListView.tsx";
import {TOnItemStatusChanged} from "recyclerlistview/src/core/ViewabilityTracker.ts";
import {PullToRefresh} from "@sdcx/pull-to-refresh";

enum ViewTypes {
    HEADER = 0,
    HALF_LEFT = 1,
}

type RowData = string;

const RecyclerViewPage3: React.FC = () => {
    const {width} = Dimensions.get("window");
    const scrollRef = useRef<RecyclerListView<any, any>>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false)
    const dataProvider = useMemo(() => {
        const dp = new DataProvider((r1: RowData, r2: RowData) => r1 !== r2);
        const rows: RowData[] = imageDataList.slice(0, 50).map((item) => item)
        return dp.cloneWithRows(rows);
    }, []);

    const layoutProvider = useMemo(() => {
        return new LayoutProvider(
            (index: number) => {
                return ViewTypes.HALF_LEFT
            },
            (type: number | string, dim: { width: number; height: number }) => {
                dim.width = width / 2 - 0.0001;
                dim.height = width / 2 - 0.0001;
            }
        );
    }, [width]);




    const rowRenderer = (type: number | string, data: RowData): React.ReactElement | null => {
        return (
            <TouchableOpacity onPress={() => {
                console.log("click")
            }} style={styles.containerGridLeft}>
                <XImage model={data} style={styles.image} resizeMode={'center'}/>
            </TouchableOpacity>
        )
    };


    const dataProvider2 = useMemo(() => {
        const dp = new DataProvider((r1: RowData, r2: RowData) => r1 !== r2);
        const rows: RowData[] = imageDataList
            .slice(0, 10)
            .map((item) => item)
        return dp.cloneWithRows(rows);
    }, []);

    const layoutProvider2 = useMemo(() => {
        return new LayoutProvider(
            (index: number) => {
                if (index === 0) {
                    return ViewTypes.HEADER;
                }
                return ViewTypes.HALF_LEFT;
            },
            (type: number | string, dim: { width: number; height: number }) => {
                if (type === ViewTypes.HEADER) {
                    dim.width = width;
                    dim.height = 50;
                } else {
                    dim.width = width;
                    dim.height = width;
                }
            }
        );
    }, [width]);

    const Header = () => <View style={styles.header}>
        <Text style={{color: 'white', width: 'auto', textAlign: 'center', alignSelf: "center"}}>头部</Text>
    </View>;

    const rowRenderer2 = (type: number | string, data: RowData): React.ReactElement | null => {
        if (type === ViewTypes.HEADER) {
            return (
                Header()
            )
        }

        return (
            <TouchableOpacity onPress={() => {
                console.log("click")
            }} style={styles.containerGridLeft}>
                <XImage model={data} style={styles.image2} resizeMode={'cover'}/>
            </TouchableOpacity>
        )
    };
    return (
        <View style={{flex: 1, width: '100%'}}>
            <View style={{width: '100%', height: 100}}>
                <RecyclerListView
                    ref={scrollRef}
                    style={{backgroundColor: "red"}}

                    layoutProvider={layoutProvider}
                    // scrollViewProps={{
                    //     ref: scrollRef,
                    // }}
                    dataProvider={dataProvider}
                    isHorizontal
                    onRecreate={(params: OnRecreateParams) => {
                        console.log("onRecreate:", params);
                    }}
                    onVisibleIndicesChanged={(e: TOnItemStatusChanged) => {
                        console.log("onVisibleIndicesChanged", e);
                    }}
                    onScroll={(rawEvent: ScrollEvent, offsetX: number, offsetY: number) => {
                        console.log("onVisibleIndicesChanged", offsetX, offsetY);
                    }}
                    // renderItemContainer={(props, parentProps, children) => {
                    //     return <View style={{width: 100, height: 100, backgroundColor: "blue", marginVertical: 10,}}>
                    //         <Text>item Container</Text>
                    //     </View>
                    // }}
                    renderFooter={() => {
                        return (
                            <Text>尾部</Text>
                        )
                    }}
                    rowRenderer={rowRenderer}
                />
            </View>

            <Button title={"滑动到0"} onPress={() => {
                // scrollRef.current?.scrollToIndex(1,true)
                scrollRef.current?.bringToFocus(5, true)
            }}></Button>

            <View style={{flex: 1}}>
                <PullToRefresh
                    style={{flex: 1}}
                    refreshing={refreshing}
                    onRefresh={() => {
                        setRefreshing(true);
                        setTimeout(() => {
                            setRefreshing(false);
                        }, 1000)
                    }}
                    onLoadMore={()=>{
                        setIsLoadMore(true);
                        setTimeout(() => {
                            setIsLoadMore(false);
                        }, 1000)
                    }}
                    loadingMore={isLoadMore}
                >
                    <RecyclerListView
                        style={{flex: 1}}
                        layoutProvider={layoutProvider2}
                        dataProvider={dataProvider2}
                        renderFooter={() => {
                            return (
                                <Text style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    color: 'white',
                                    height: 50,
                                    backgroundColor: '#167520'
                                }}>尾部</Text>
                            )
                        }}
                        rowRenderer={rowRenderer2}
                    />

                </PullToRefresh>


            </View>

        </View>

    );
};

export default RecyclerViewPage3;

const BORDER_RADIUS = 10;

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#00a1f1",
    },
    containerGridLeft: {
        justifyContent: "space-around",
        alignItems: "center",
        marginHorizontal: 2,
        marginVertical: 2,
        backgroundColor: "white",
        borderRadius: BORDER_RADIUS,
        borderWidth: 1,
        borderColor: "red",
    },
    containerGridRight: {
        justifyContent: "space-around",
        alignItems: "center",
        marginHorizontal: 2,
        marginVertical: 2,
        backgroundColor: "white",
        borderRadius: BORDER_RADIUS,
        borderWidth: 1,
        borderColor: "green",

    },
    image: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: BORDER_RADIUS,
    },
    image2: {
        width: WINDOW_WIDTH,
        aspectRatio: 1,
        borderRadius: BORDER_RADIUS,
    },
    header: {
        backgroundColor: '#f15a54',
        height: 50,
        justifyContent: 'center'
    },

});
