import React, {lazy, Suspense, useEffect, useRef} from 'react';
import {
    getFocusedRouteNameFromRoute,
    NavigationContainer,
    NavigationContainerRef,
    useNavigationState,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ThemeProvider, useTheme} from './src/theme/ThemeContext';
import {Image, LogBox, StatusBar} from 'react-native';
import {LoadingScreen} from './src/component/LoadingScreen';
import {enableFreeze, enableScreens} from 'react-native-screens';
import {SafeAreaView} from 'react-native-safe-area-context';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {createStackNavigator} from '@react-navigation/stack';

// 启用屏幕优化
enableScreens(true);
enableFreeze(true);

// 禁用默认加载指示器
LogBox.ignoreLogs(['loading']);

// 使用懒加载替代直接导入
const HomeScreen = lazy(() => import('./src/pages/component/HomeScreen.tsx').then(module => ({ default: module.HomeScreen })));
const NativeScreen = lazy(() => import('./src/pages/native/NativeScreen').then(module => ({ default: module.NativeScreen })));
const OtherScreen = lazy(() => import('./src/pages/other/OtherScreen').then(module => ({ default: module.OtherScreen })));
const NavigationTestTabScreen = lazy(() =>
    import('./src/pages/navigation/NavigationTestTabScreen').then(module => ({
        default: module.NavigationTestTabScreen,
    }))
);
const NavigationTestDetailScreen = lazy(() =>
    import('./src/pages/navigation/NavigationTestDetailScreen').then(module => ({
        default: module.NavigationTestDetailScreen,
    }))
);
const NavigationTestModalScreen = lazy(() =>
    import('./src/pages/navigation/NavigationTestModalScreen').then(module => ({
        default: module.NavigationTestModalScreen,
    }))
);

const Stack = createStackNavigator();

// 创建底部标签导航器
const Tab = createBottomTabNavigator();

const routesWithTabBar = new Set([
    'MainTabScreen',
    '首页',
    'ComponentList',
    '原生',
    'NativeList',
    '其他',
    'OtherList',
    '导航测试',
]);

const tabInitialRouteMap: Record<string, string> = {
    首页: 'ComponentList',
    原生: 'NativeList',
    其他: 'OtherList',
    导航测试: '导航测试',
};

// 包装懒加载组件
const LazyHomeScreen = () => (
    <Suspense fallback={<LoadingScreen />}>
        <HomeScreen />
    </Suspense>
);

const LazyNativeScreen = () => (
    <Suspense fallback={<LoadingScreen />}>
        <NativeScreen />
    </Suspense>
);

const LazyOtherScreen = () => (
    <Suspense fallback={<LoadingScreen />}>
        <OtherScreen />
    </Suspense>
);

const LazyNavigationTestTabScreen = (props: any) => (
    <Suspense fallback={<LoadingScreen />}>
        <NavigationTestTabScreen {...props} />
    </Suspense>
);

const LazyNavigationTestDetailScreen = (props: any) => (
    <Suspense fallback={<LoadingScreen />}>
        <NavigationTestDetailScreen {...props} />
    </Suspense>
);

const LazyNavigationTestModalScreen = (props: any) => (
    <Suspense fallback={<LoadingScreen />}>
        <NavigationTestModalScreen {...props} />
    </Suspense>
);

function MainTabBarScreen() {
    const {colors} = useTheme();
    const currentRootRouteName = useNavigationState(state => state.routes[state.index]?.name ?? 'MainTabScreen');
    const isMainTabActive = currentRootRouteName === 'MainTabScreen';

    return (
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
                    } else if (route.name === '导航测试') {
                        icon = require('./src/assets/images/ic_home.png');
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
                    display: (() => {
                        const nestedRouteName =
                            getFocusedRouteNameFromRoute(route) ?? tabInitialRouteMap[route.name] ?? route.name;
                        return isMainTabActive && routesWithTabBar.has(nestedRouteName) ? 'flex' : 'none';
                    })(),
                    backgroundColor: colors.background,
                },
                tabBarActiveBackgroundColor: colors.card,
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
            })}
        >
            <Tab.Screen name="首页" component={LazyHomeScreen} />
            <Tab.Screen name="原生" component={LazyNativeScreen} />
            <Tab.Screen name="其他" component={LazyOtherScreen} />
            <Tab.Screen name="导航测试" component={LazyNavigationTestTabScreen} />
        </Tab.Navigator>
    );
}

function MainNavigator() {
    const { colors } = useTheme();
    const navigationRef = useRef<NavigationContainerRef<any>>(null);

    useEffect(() => {
        // SystemNavigationBar.fullScreen(true);
        // SystemNavigationBar.immersive();
        // SystemNavigationBar.navigationShow()
        SystemNavigationBar.setNavigationColor('red')
    })

    // React.useEffect(() => {
    //     const colorScheme = MyTheme.dark ? 'dark' : 'light';
    //     Appearance.setColorScheme(colorScheme);
    // }, [MyTheme]);

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={colors.background}

            />
            <NavigationContainer
                fallback={null}
                ref={navigationRef}
                onStateChange={(_) => {
                    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name ?? '';
                    console.log(`当前导航的:${currentRouteName}`);
                }}
            >
                <Stack.Navigator
                    initialRouteName={'MainTabScreen'}
                    screenOptions={{
                        headerTitleAlign: 'center',
                        freezeOnBlur: true,
                    }}
                >
                    <Stack.Group screenOptions={{}}>
                        <Stack.Screen
                            name={'MainTabScreen'}
                            component={MainTabBarScreen}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name={'NavigationTestDetail'}
                            component={LazyNavigationTestDetailScreen}
                            options={({route}: any) => ({
                                title: `导航测试详情 ${route.params?.level ?? 1}`,
                            })}
                        />
                    </Stack.Group>
                    <Stack.Group screenOptions={{presentation: 'modal'}}>
                        <Stack.Screen
                            name={'NavigationTestModal'}
                            component={LazyNavigationTestModalScreen}
                            options={{title: '导航测试 Modal'}}
                        />
                    </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>

    );
}

function App(): React.JSX.Element {
    return (
        <ThemeProvider>
            <MainNavigator />
        </ThemeProvider >
    );
}

export default App;
