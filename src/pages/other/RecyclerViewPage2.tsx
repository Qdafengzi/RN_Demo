import React, {useMemo} from "react";
import {View, Text, Dimensions, StyleSheet, type ViewProps} from "react-native";
import {RecyclerListView, DataProvider, LayoutProvider} from "recyclerlistview";
import {imageDataList} from "../../data/Constant.ts";
import XImage from "../component/XImage.tsx";
import {ScrollEvent} from "recyclerlistview/src/core/scrollcomponent/BaseScrollView.tsx";

enum ViewTypes {
    HALF_LEFT = 1,
    HALF_RIGHT = 2,
}

type RowData = string;

const RecyclerViewPage2: React.FC = () => {
    const {width} = Dimensions.get("window");

    const dataProvider = useMemo(() => {
        const dp = new DataProvider((r1: RowData, r2: RowData) => r1 !== r2);
        const rows: RowData[] = imageDataList.map((item) => item)
        return dp.cloneWithRows(rows);
    }, []);

    const layoutProvider = useMemo(() => {
        return new LayoutProvider(
            (index: number) => {
                return (index % 2 === 0) ? ViewTypes.HALF_LEFT : ViewTypes.HALF_RIGHT
            },
            (type: number | string, dim: { width: number; height: number }) => {
                switch (type) {
                    case ViewTypes.HALF_LEFT:
                        dim.width = width / 2 - 0.0001;
                        dim.height = width / 2 - 0.0001;
                        break;
                    case ViewTypes.HALF_RIGHT:
                        dim.width = width / 2;
                        dim.height = width / 2;
                        break;
                    default:
                        dim.width = 0;
                        dim.height = 0;
                }
            }
        );
    }, [width]);

    const rowRenderer = (type: number | string, data: RowData): React.ReactElement | null => {
        switch (type) {
            case ViewTypes.HALF_LEFT:
                return (
                    <View style={styles.containerGridLeft}>
                        <XImage model={data} style={styles.image}/>
                    </View>
                );
            case ViewTypes.HALF_RIGHT:
                return (
                    <View style={styles.containerGridRight}>
                        <XImage model={data} style={styles.image}/>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <RecyclerListView
            style={{paddingTop: 10,backgroundColor: "#00a1f1"}}
            layoutProvider={layoutProvider}
            dataProvider={dataProvider}
            renderAheadOffset={100}
            onVisibleIndicesChanged={(e)=>{
                console.log("onVisibleIndicesChanged", e);
            }}
            onScroll={(rawEvent: ScrollEvent, offsetX: number, offsetY: number)=>{
                console.log("onVisibleIndicesChanged", offsetX, offsetY);
            }}

            // renderItemContainer={()=>{
            //     return (
            //         <View style={{width:'100%',backgroundColor:'red'}}></View>
            //     )
            // }}
            // renderContentContainer={() => {
            //     return (
            //         <View style={{width: '100%', height: 100, backgroundColor: 'red'}}></View>
            //     )
            // }}
            renderFooter={() => {
                return (
                    <Text>尾部</Text>
                )
            }}
            rowRenderer={rowRenderer}
        />
    );
};

export default RecyclerViewPage2;

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
        flex: 1,
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
        flex: 1,
        marginHorizontal: 2,
        marginVertical: 2,
        backgroundColor: "white",
        borderRadius: BORDER_RADIUS,
        borderWidth: 1,
        borderColor: "green",

    },
    image: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: BORDER_RADIUS,
    }
});
