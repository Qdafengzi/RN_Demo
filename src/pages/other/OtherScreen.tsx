import React, {lazy, Suspense} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {usePageReport} from '../../hooks/usePageReport';
import {LoadingScreen} from '../../component/LoadingScreen.tsx';
import {ComponentStackParamList, OtherListScreen} from './OtherListScreen.tsx';

// 使用懒加载替代直接导入
const UseStateDetailScreen = lazy(() => import('./UseStateScreen').then(module => ({default: module.UseStateScreen})));
const NativeEvent = lazy(() => import('./NativeEvent').then(module => ({default: module.NativeEvent})));
const ReducerDemo = lazy(() => import('./ReducerDemo').then(module => ({default: module.ReducerDemo})));
const ZustandDemo = lazy(() => import('./ZustandDemo').then(module => ({default: module.ZustandDemo})));
const UseShallowDemo = lazy(() => import('./UseShallowDemo').then(module => ({default: module.UseShallowDemo})));
const RxJSBasicDemo = lazy(() => import('./RxJSBasicDemo').then(module => ({default: module.default})));
const RxJSOperatorsDemo = lazy(() => import('./RxJSOperatorsDemo').then(module => ({default: module.default})));
const RxJSSubjectDemo = lazy(() => import('./RxJSSubjectDemo').then(module => ({default: module.default})));
const RxJSRealWorldDemo = lazy(() => import('./RxJSRealWorldDemo').then(module => ({default: module.default})));
const RxJSAdvancedDemo = lazy(() => import('./RxJSAdvancedDemo').then(module => ({default: module.default})));
const FileUploadDemo = lazy(() => import('./FileUploadDemo').then(module => ({default: module.default})));
const FlatListDemo = lazy(() => import('./FlatListDemo').then(module => ({default: module.default})));

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


const LazyZustandDemo = () => (
    <Suspense fallback={<LoadingScreen/>}>
        <ZustandDemo/>
    </Suspense>
);

const LazyUseShallowDemo = () => (
    <Suspense fallback={<LoadingScreen/>}>
        <UseShallowDemo/>
    </Suspense>
);

const LazyRxJSBasicDemo = () => (
    <Suspense fallback={<LoadingScreen/>}>
        <RxJSBasicDemo/>
    </Suspense>
);

const LazyRxJSOperatorsDemo = () => (
    <Suspense fallback={<LoadingScreen/>}>
        <RxJSOperatorsDemo/>
    </Suspense>
);

const LazyRxJSSubjectDemo = () => (
    <Suspense fallback={<LoadingScreen/>}>
        <RxJSSubjectDemo/>
    </Suspense>
);

const LazyRxJSRealWorldDemo = () => (
    <Suspense fallback={<LoadingScreen/>}>
        <RxJSRealWorldDemo/>
    </Suspense>
);

const LazyRxJSAdvancedDemo = () => (
    <Suspense fallback={<LoadingScreen/>}>
        <RxJSAdvancedDemo/>
    </Suspense>
);

const LazyFileUploadDemo = () => (
    <Suspense fallback={<LoadingScreen/>}>
        <FileUploadDemo/>
    </Suspense>
);

const LazyFlatListDemo = () => (
    <Suspense fallback={<LoadingScreen/>}>
        <FlatListDemo/>
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
            <Stack.Screen name="ZustandDemo" component={LazyZustandDemo} options={{title: 'ZustandDemo'}}/>
            <Stack.Screen name="UseShallowDemo" component={LazyUseShallowDemo} options={{title: 'UseShallowDemo'}}/>
            <Stack.Screen name="RxJSBasicDemo" component={LazyRxJSBasicDemo} options={{title: 'RxJS 基础概念'}}/>
            <Stack.Screen name="RxJSOperatorsDemo" component={LazyRxJSOperatorsDemo} options={{title: 'RxJS 操作符'}}/>
            <Stack.Screen name="RxJSSubjectDemo" component={LazyRxJSSubjectDemo} options={{title: 'RxJS Subject'}}/>
            <Stack.Screen name="RxJSRealWorldDemo" component={LazyRxJSRealWorldDemo} options={{title: 'RxJS 实际应用'}}/>
            <Stack.Screen name="RxJSAdvancedDemo" component={LazyRxJSAdvancedDemo} options={{title: 'RxJS 高级特性'}}/>
            <Stack.Screen name="FileUploadDemo" component={LazyFileUploadDemo} options={{title: 'FileUploadDemo'}}/>
            <Stack.Screen name="FlatListDemo" component={LazyFlatListDemo} options={{title: 'FlatListDemo'}}/>
        </Stack.Navigator>
    );
};

