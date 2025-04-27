import React from 'react';
import { ListRenderItem, StyleSheet, View } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';

const HEADER_HEIGHT = 200;

const DATA = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const identity = (v: unknown): string => v + '';

const Header = () => {
    return <View style={styles.header} />;
};

export const ListDetailScreen5: React.FC = () => {
    const renderItem: ListRenderItem<number> = React.useCallback(({ index }) => {
        return (
            <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
        );
    }, []);

    return (
        <Tabs.Container
            allowHeaderOverscroll={true}
            renderHeader={Header}
            headerHeight={HEADER_HEIGHT} // optional
        >
            <Tabs.Tab name="A">
                <Tabs.FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={identity}
                />
            </Tabs.Tab>
            <Tabs.Tab name="B">
                <Tabs.ScrollView>
                    <View style={[styles.box, styles.boxA]} />
                    <View style={[styles.box, styles.boxB]} />
                </Tabs.ScrollView>
            </Tabs.Tab>
        </Tabs.Container>
    );
};

const styles = StyleSheet.create({
    box: {
        height: 100,
        width: '100%',
    },
    boxA: {
        backgroundColor: 'white',
    },
    boxB: {
        backgroundColor: '#D8D8D8',
    },
    header: {
        height: HEADER_HEIGHT,
        width: '100%',
        backgroundColor: '#2196f3',
    },
})

