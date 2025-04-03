import React, {lazy, Suspense, useRef, useState} from 'react';
import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ThemeProvider, useTheme} from './src/theme/ThemeContext';
import {Image, LogBox} from 'react-native';
import {LoadingScreen} from './src/component/LoadingScreen';
import {enableScreens} from 'react-native-screens';

// 启用屏幕优化
enableScreens();

// 禁用默认加载指示器
LogBox.ignoreLogs(['loading']);

// 使用懒加载替代直接导入
const HomeScreen = lazy(() => import('./src/pages/component/HomeScreen.tsx').then(module => ({default: module.HomeScreen})));
const NativeScreen = lazy(() => import('./src/pages/native/NativeScreen').then(module => ({default: module.NativeScreen})));
const OtherScreen = lazy(() => import('./src/pages/other/OtherScreen').then(module => ({default: module.OtherScreen})));


// 创建底部标签导航器
const Tab = createBottomTabNavigator();

// 包装懒加载组件
const LazyHomeScreen = () => (
    <Suspense fallback={<LoadingScreen/>}>
        <HomeScreen/>
    </Suspense>
);

const LazyNativeScreen = () => (
    <Suspense fallback={<LoadingScreen/>}>
        <NativeScreen/>
    </Suspense>
);

const LazyOtherScreen = () => (
    <Suspense fallback={<LoadingScreen/>}>
        <OtherScreen/>
    </Suspense>
);

function MainNavigator() {
    const {colors} = useTheme();
    const navigationRef = useRef<NavigationContainerRef<any>>(null);
    const [tabBarHide, setTabBarHide] = useState(false);

    return (
        <NavigationContainer
            fallback={null}
            ref={navigationRef}
            onStateChange={(_) => {
                const currentRouteName = navigationRef.current?.getCurrentRoute()?.name ?? '';
                console.log(`当前导航的:${currentRouteName}`);
                if (currentRouteName === 'ComponentList' || currentRouteName === '原生' || currentRouteName === '其他') {
                    setTabBarHide(false);
                } else {
                    setTabBarHide(true);
                }
            }}
        >
            <Tab.Navigator
                initialRouteName={'首页'}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        console.log(`route:${route.name}`);
                        let icon = require('./src/assets/images/ic_home.png');
                        if (route.name === '首页') {
                            icon = require('./src/assets/images/ic_home.png');
                        } else if (route.name === '原生') {
                            icon = require('./src/assets/images/ic_home_native.png');
                        } else if (route.name === '其他') {
                            icon = require('./src/assets/images/ic_home_other.png');
                        }
                        return (
                            <Image
                                source={icon}
                                style={{width: size, height: size, tintColor: color, opacity: focused ? 1 : 0.5}}
                            />
                        );
                    },
                    tabBarActiveTintColor: colors.text,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: colors.text,
                    },
                    tabBarInactiveTintColor: colors.text,
                    tabBarShowLabel: true,
                    tabBarLabelPosition: 'below-icon',
                    tabBarIndicatorStyle: {
                        backgroundColor: colors.primary,
                        height: 2,
                    },
                    tabBarStyle: {
                        display: tabBarHide ? 'none' : 'flex',
                        backgroundColor: colors.background,
                    },
                    tabBarActiveBackgroundColor:colors.card,
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                    headerTintColor: colors.text,
                    headerShadowVisible: true,
                    headerShadowColor: colors.primary,
                    headerShadowOpacity: 0.5,
                    headerShadowRadius: 10,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerShown: false,
                })}>


                <Tab.Screen name="首页" component={LazyHomeScreen}/>
                <Tab.Screen name="原生" component={LazyNativeScreen}/>
                <Tab.Screen name="其他" component={LazyOtherScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

function App(): React.JSX.Element {
    return (
        <ThemeProvider>
            <MainNavigator/>
        </ThemeProvider>
    );
}

export default App;
