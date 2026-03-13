import React, {useMemo, useRef} from "react";
import {Button, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {DataProvider, LayoutProvider, RecyclerListView} from "recyclerlistview";
import XImage from "../component/XImage.tsx";
import {ScrollEvent} from "recyclerlistview/src/core/scrollcomponent/BaseScrollView.tsx";
import {imageDataList} from "../../data/Constant.ts";
import {WINDOW_WIDTH} from "@gorhom/bottom-sheet";

enum ViewTypes {
    HALF_LEFT = 1,
}

type RowData = string;

const RecyclerViewPage3: React.FC = () => {
    const {width} = Dimensions.get("window");
    const scrollRef = useRef<any>();

    const dataProvider = useMemo(() => {
        const dp = new DataProvider((r1: RowData, r2: RowData) => r1 !== r2);
        const rows: RowData[] = imageDataList.slice(0, 50).map((item) => item)
        return dp.cloneWithRows(rows);
    }, []);

    const dataProvider2 = useMemo(() => {
        const dp = new DataProvider((r1: RowData, r2: RowData) => r1 !== r2);
        const rows: RowData[] = imageDataList.slice(10, 20).map((item) => item)
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

    const layoutProvider2 = useMemo(() => {
        return new LayoutProvider(
            (index: number) => {
                return ViewTypes.HALF_LEFT
            },
            (type: number | string, dim: { width: number; height: number }) => {
                dim.width = width;
                dim.height = width;
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

    const rowRenderer2 = (type: number | string, data: RowData): React.ReactElement | null => {
        return (
            <TouchableOpacity onPress={() => {
                console.log("click")
            }} style={styles.containerGridLeft}>
                <XImage model={data} style={styles.image2} resizeMode={'center'}/>
            </TouchableOpacity>
        )
    };

    return (
        <View style={{flex: 1, width: '100%'}}>
            <View style={{width: '100%', height: 200}}>
                <RecyclerListView
                    style={{paddingTop: 10, backgroundColor: "red"}}
                    layoutProvider={layoutProvider}
                    scrollViewProps={{
                        ref: scrollRef,
                    }}
                    dataProvider={dataProvider}
                    isHorizontal
                    onRecreate={(params) => {
                        console.log("onRecreate:", params);
                    }}
                    onVisibleIndicesChanged={(e) => {
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
                scrollRef?.current._scrollViewRef.scrollTo({
                    x: 2000,
                    y: 0,
                    animated: true
                });
            }}></Button>

            <View style={{flex: 1, backgroundColor: "blue"}}>
                <RecyclerListView
                    style={{paddingTop: 10}}
                    layoutProvider={layoutProvider2}
                    dataProvider={dataProvider2}
                    onRecreate={(params) => {
                        console.log("onRecreate:", params);
                    }}
                    onVisibleIndicesChanged={(e) => {
                        console.log("onVisibleIndicesChanged", e);
                    }}
                    onScroll={(rawEvent: ScrollEvent, offsetX: number, offsetY: number) => {
                        console.log("onVisibleIndicesChanged", offsetX, offsetY);
                    }}
                    renderFooter={() => {
                        return (
                            <Text>尾部</Text>
                        )
                    }}
                    rowRenderer={rowRenderer2}
                />
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
    }
});
