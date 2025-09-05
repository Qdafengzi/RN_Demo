import React, {lazy, Suspense} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {usePageReport} from '../../hooks/usePageReport';
import {LoadingScreen} from '../../component/LoadingScreen.tsx';
import {ComponentStackParamList, OtherListScreen} from './OtherListScreen.tsx';

// 使用懒加载替代直接导入
const UseStateDetailScreen = lazy(() => import('./UseStateScreen').then(module => ({default: module.UseStateScreen})));
const NativeEvent = lazy(() => import('./NativeEvent').then(module => ({default: module.NativeEvent})));
const ReducerDemo = lazy(() => import('./ReducerDemo').then(module => ({default: module.ReducerDemo})));

const Stack = createStackNavigator<ComponentStackParamList>();

// 包装懒加载组件
const LazyUseStateScreen = () => (
    <Suspense fallback={<LoadingScreen/>}>
        <UseStateDetailScreen/>
    </Suspense>
);

const LazyNativeEvent = () => (
    <Suspense fallback={<LoadingScreen/>}>
        <NativeEvent/>
    </Suspense>
);


const LazyReducerDemo = () => (
    <Suspense fallback={<LoadingScreen/>}>
        <ReducerDemo/>
    </Suspense>
);



// 主组件页面，包含嵌套导航
export const OtherScreen: React.FC = () => {
    usePageReport('OtherScreen');

    return (
        <Stack.Navigator
            initialRouteName="OtherList"
            screenOptions={({route}) => ({
                headerShown: route.name !== 'OtherList',
                headerTitleAlign: 'center',
            })}

        >
            <Stack.Screen
                name="OtherList"
                component={OtherListScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen name="useState" component={LazyUseStateScreen} options={{title: 'useState'}}/>
            <Stack.Screen name="NativeEvent" component={LazyNativeEvent} options={{title: 'NativeEvent'}}/>
            <Stack.Screen name="ReducerDemo" component={LazyReducerDemo} options={{title: 'ReducerDemo'}}/>
        </Stack.Navigator>
    );
};

