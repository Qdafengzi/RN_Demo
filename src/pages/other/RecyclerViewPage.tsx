import {PullToRefresh} from "@sdcx/pull-to-refresh";
import React, {useMemo, useState} from "react";
import {View, Text, Dimensions, StyleSheet, type ViewProps} from "react-native";
import {RecyclerListView, DataProvider, LayoutProvider} from "recyclerlistview";

enum ViewTypes {
    FULL = 0,
    HALF_LEFT = 1,
    HALF_RIGHT = 2,
}

type RowData = number;

let containerCount = 0;

type CellContainerProps = ViewProps & { children?: React.ReactNode };

const CellContainer: React.FC<CellContainerProps> = ({children, ...rest}) => {
    const id = useMemo(() => containerCount++, []);
    return (
        <View {...rest}>
            {children}
            <Text>Cell Id: {id}</Text>
        </View>
    );
};

const RecyclerViewPage: React.FC = () => {
    const {width} = Dimensions.get("window");
    const [refreshing, setRefreshing] = useState(false);
    const dataProvider = useMemo(() => {
        const dp = new DataProvider((r1: RowData, r2: RowData) => r1 !== r2);
        const rows: RowData[] = Array.from({length: 300}, (_, i) => i);
        return dp.cloneWithRows(rows);
    }, []);

    const layoutProvider = useMemo(() => {
        return new LayoutProvider(
            (index: number) => {
                if (index % 3 === 0) return ViewTypes.FULL;
                if (index % 3 === 1) return ViewTypes.HALF_LEFT;
                return ViewTypes.HALF_RIGHT;
            },
            (type: number | string, dim: { width: number; height: number }) => {
                switch (type) {
                    case ViewTypes.HALF_LEFT:
                        dim.width = width / 2 - 0.0001;
                        dim.height = 160;
                        break;
                    case ViewTypes.HALF_RIGHT:
                        dim.width = width / 2;
                        dim.height = 160;
                        break;
                    case ViewTypes.FULL:
                        dim.width = width;
                        dim.height = 140;
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
                    <CellContainer style={styles.containerGridLeft}>
                        <Text>Data: {data}</Text>
                    </CellContainer>
                );
            case ViewTypes.HALF_RIGHT:
                return (
                    <CellContainer style={styles.containerGridRight}>
                        <Text>Data: {data}</Text>
                    </CellContainer>
                );
            case ViewTypes.FULL:
                return (
                    <CellContainer style={styles.container}>
                        <Text>Data: {data}</Text>
                    </CellContainer>
                );
            default:
                return null;
        }
    };

    return (
        <PullToRefresh
            refreshing={refreshing}
            onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => {
                    setRefreshing(false);
                }, 500);
            }}
        >
            <RecyclerListView
                layoutProvider={layoutProvider}
                dataProvider={dataProvider}
                rowRenderer={rowRenderer}
            />
        </PullToRefresh>

    );
};

export default RecyclerViewPage;

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
        backgroundColor: "#ffbb00",
    },
    containerGridRight: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#7cbb00",
    },
});
