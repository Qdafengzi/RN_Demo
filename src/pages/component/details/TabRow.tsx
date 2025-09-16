import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type TabParamList = {
    Gallery: undefined;
    Products: undefined;
    Collections: undefined;
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

const CustomTabLabel = ({focused, children}: {
    focused: boolean;
    color: string;
    children: string;
}) => {
    return (
        <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            paddingHorizontal: 12,
        }}>
            <Text style={{
                color: focused ? '#167520' : 'rgb(116,116,119)',
                fontSize: 16,
                fontWeight: focused ? '600' : '400',
                textAlign: 'center',
            }}>
                {children}
            </Text>

            {/* 自定义 indicator */}
            <View style={{
                marginTop: 8,
                height: 4,
                backgroundColor: focused ? '#167520' : 'transparent',
                borderRadius: focused ? 4 : 0,
                width: '100%', // 宽度与文字一致
                minWidth: 20, // 最小宽度
            }}/>
        </View>
    );
};


function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarIndicatorStyle: {width: 0},
                tabBarLabel: CustomTabLabel,
            }}
        >
            <Tab.Screen name="Gallery" component={GalleryScreen}/>
            <Tab.Screen name="Products" component={ProductsScreen}/>
            <Tab.Screen name="Collections" component={CollectionScreen}/>
        </Tab.Navigator>
    );
}

function GalleryScreen() {
    const navigation = useNavigation<NavigationProp<TabParamList>>();

    return (
        <View style={styles.pageContainer}>
            <Text>Gallery Screen</Text>
            <Button title={'Go to Products'} onPress={() => navigation.navigate('Products')}/>
        </View>
    );
}

function ProductsScreen() {
    const navigation = useNavigation<NavigationProp<TabParamList>>();

    return (
        <View style={styles.pageContainer}>
            <Text>Products Screen</Text>
            <Button title={'Go to Collection'} onPress={() => navigation.navigate('Collections')}/>
        </View>
    );
}

function CollectionScreen() {
    const navigation = useNavigation<NavigationProp<TabParamList>>();

    return (
        <View style={styles.pageContainer}>
            <Text>Collections Screen</Text>
            <Button title={'Go to Gallery'} onPress={() => navigation.navigate('Gallery')}/>
        </View>
    );
}

export const TabRow: React.FC = () => {
    return (
        <View style={styles.container}>
            <MyTabs/>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
    },
    pageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});
