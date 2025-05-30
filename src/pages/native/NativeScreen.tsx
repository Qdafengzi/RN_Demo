import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { usePageReport } from '../../hooks/usePageReport';
import { LoadingScreen } from '../../component/LoadingScreen.tsx';
import { NativeListScreen, NativeStackParamList } from './NativeListScreen.tsx';

// 使用懒加载替代直接导入
const NativeTextScreen = lazy(() => import('./pages/NativeTextScreen.tsx').then(module => ({ default: module.NativeTextScreen })));
const NativeWebViewScreen = lazy(() => import('./pages/NativeWebviewScreen.tsx').then(module => ({ default: module.NativeWebviewScreen })));
const NativeSliderScreen = lazy(() => import('./pages/NativeSliderScreen.tsx').then(module => ({ default: module.NativeSliderScreen })));
const NativeComposeSliderScreen = lazy(() => import('./pages/NativeComposeSliderScreen.tsx').then(module => ({ default: module.NativeComposeSliderScreen })));
const PullToRefreshPage = lazy(() => import('./pages/PullToRefreshPage.tsx').then(module => ({ default: module.PullToRefreshPage })));

const Stack = createStackNavigator<NativeStackParamList>();

// 包装懒加载组件
const LazyNativeTextScreen = () => (
    <Suspense fallback={<LoadingScreen />}>
        <NativeTextScreen />
    </Suspense>
);

const LazyNativeWebViewScreen = () => (
    <Suspense fallback={<LoadingScreen />}>
        <NativeWebViewScreen />
    </Suspense>
);

const LazyNativeSliderScreen = () => (
    <Suspense fallback={<LoadingScreen />}>
        <NativeSliderScreen />
    </Suspense>
);

const LazyNativeComposeSliderScreen = () => (
    <Suspense fallback={<LoadingScreen />}>
        <NativeComposeSliderScreen />
    </Suspense>
);

const LazyPullToRefreshPage = () => (
    <Suspense fallback={<LoadingScreen />}>
        <PullToRefreshPage />
    </Suspense>
);


// 主组件页面，包含嵌套导航
export const NativeScreen: React.FC = () => {
    usePageReport('NativeScreen');

    return (
        <Stack.Navigator
            initialRouteName="NativeList"
            screenOptions={({ route }) => ({
                headerShown: route.name !== 'NativeList',
                headerTitleAlign: 'center',
            })}

        >
            <Stack.Screen
                name="NativeList"
                component={NativeListScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="TextScreen" component={LazyNativeTextScreen} options={{ title: 'NativeText' }} />
            <Stack.Screen name="WebViewScreen" component={LazyNativeWebViewScreen} options={{ title: 'NativeWeb' }} />
            <Stack.Screen name="SliderScreen" component={LazyNativeSliderScreen} options={{ title: 'NativeSilder' }} />
            <Stack.Screen name="SliderComposeScreen" component={LazyNativeComposeSliderScreen} options={{ title: 'NativeComposeSilder' }} />
            <Stack.Screen name="PullToRefreshPage" component={LazyPullToRefreshPage} options={{ title: 'PullToRefreshPage' }} />
        </Stack.Navigator>
    );
};

