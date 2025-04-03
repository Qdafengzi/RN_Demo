import React, {lazy, Suspense, useEffect, useRef, useState} from 'react';
import {NavigationContainer, NavigationContainerRef, useRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ThemeProvider, useTheme} from './src/theme/ThemeContext';
import {Image, LogBox} from 'react-native';
import {LoadingScreen} from './src/component/LoadingScreen';
import {enableScreens} from 'react-native-screens';

// 启用屏幕优化
enableScreens();

// 禁用默认加载指示器
LogBox.ignoreLogs(['Sending']);

// 使用懒加载替代直接导入
const ComponentScreen = lazy(() => import('./src/pages/component/ComponentScreen').then(module => ({default: module.ComponentScreen})));
const NativeScreen = lazy(() => import('./src/pages/native/NativeScreen').then(module => ({default: module.NativeScreen})));
const OtherScreen = lazy(() => import('./src/pages/other/OtherScreen').then(module => ({default: module.OtherScreen})));


// 创建底部标签导航器
const Tab = createBottomTabNavigator();

// 包装懒加载组件
const LazyComponentScreen = () => (
    <Suspense fallback={<LoadingScreen/>}>
        <ComponentScreen/>
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
    const routeNameRef = useRef(null);
    const [tabBarHide, setTabBarHide] = useState(false)
    // const route = useRoute();

    useEffect(() => {
        console.log("导航",routeNameRef)

    }, []);

    return (
        <NavigationContainer fallback={null}
                             ref={navigationRef}
                             onStateChange={(state) => {
                                 // 每次导航状态变化时触发
                                 console.log(`当前的状态state:`,state)
                                 // console.log(`当前的状态`,navigationRef.current?.getCurrentRoute().name);
                                 const  currentRouteName = navigationRef.current?.getCurrentRoute()?.name ?? '';
                                     // (navigationRef.current as NavigationContainerRef<any>?).getCurrentRoute().name
                                 // const currentRouteName = navigationRef.current?.getCurrentRoute().name;

                                 // console.log(`当前导航的:${route.name}`);


                                 if (currentRouteName === 'ComponentList' ||  currentRouteName === '原生' ||currentRouteName === '其他') {
                                     setTabBarHide(false);
                                 } else {
                                     setTabBarHide(true);
                                 }


                                 // const currentRoute = navigationRef.current?.getCurrentRoute();
                                 // console.log('导航状态变化:', currentRoute?.name);
                                 //
                                 // // 根据路由名称判断是否显示底部标签栏
                                 // // 例如，如果不是主页面，则隐藏底部标签栏
                                 // const isMainScreen = ['首页', '原生', '其他', 'ComponentList'].includes(currentRoute?.name || '');
                                 //
                                 // // 这里可以通过其他方式动态修改底部标签栏的显示状态
                                 // // 例如使用全局状态管理或Context
                             }}
        >
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        if (route.name === '首页') {
                            // 使用本地图片作为图标
                            return (
                                <Image
                                    source={require('./src/assets/images/home_active.png')}
                                    style={{width: size, height: size, tintColor: color, opacity: focused ? 1 : 0.5}}
                                />
                            );
                        } else if (route.name === '原生') {
                            return (
                                <Image
                                    source={require('./src/assets/images/home_active.png')}
                                    style={{width: size, height: size, tintColor: color, opacity: focused ? 1 : 0.5}}
                                />
                            );
                        } else if (route.name === '其他') {
                            return (
                                <Image
                                    source={require('./src/assets/images/home_active.png')}
                                    style={{width: size, height: size, tintColor: color, opacity: focused ? 1 : 0.5}}
                                />
                            );
                        }
                        return null;
                    },
                    tabBarActiveTintColor: colors.primary,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: 'bold',
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
                    },
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


                <Tab.Screen name="首页" component={LazyComponentScreen}/>
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
