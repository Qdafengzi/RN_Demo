import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ComponentListScreen, ComponentStackParamList } from './ComponentListScreen';
import { usePageReport } from '../../hooks/usePageReport';
import {LoadingScreen} from '../../component/LoadingScreen.tsx';
// import {useTheme} from '../../theme/ThemeContext.tsx';

// 使用懒加载替代直接导入
const ButtonDetailScreen = lazy(() => import('./details/ButtonDetailScreen').then(module => ({ default: module.ButtonDetailScreen })));
const TextDetailScreen = lazy(() => import('./details/TextDetailScreen').then(module => ({ default: module.TextDetailScreen })));
const InputDetailScreen = lazy(() => import('./details/InputDetailScreen').then(module => ({ default: module.InputDetailScreen })));
const ListDetailScreen1 = lazy(() => import('./details/ListDetailScreen1').then(module => ({ default: module.ListDetailScreen1 })));
const ListDetailScreen2 = lazy(() => import('./details/ListDetailScreen2').then(module => ({ default: module.ListDetailScreen2 })));
const ListDetailScreen3 = lazy(() => import('./details/ListDetailScreen3').then(module => ({ default: module.ListDetailScreen3 })));
const ListDetailScreen4 = lazy(() => import('./details/ListDetailScreen4').then(module => ({ default: module.ListDetailScreen4 })));
const ListDetailScreen5 = lazy(() => import('./details/ListDetailScreen5').then(module => ({ default: module.ListDetailScreen5 })));
const ImageDetailScreen = lazy(() => import('./details/ImageDetailScreen').then(module => ({ default: module.ImageDetailScreen })));
const NavigationDetailScreen = lazy(() => import('./details/NavigationDetailScreen').then(module => ({ default: module.NavigationDetailScreen })));
const ModalDetailScreen = lazy(() => import('./details/ModalDetailScreen').then(module => ({ default: module.ModalDetailScreen })));
const ScrollViewDetailScreen = lazy(() => import('./details/ScrollViewDetailScreen').then(module => ({ default: module.ScrollViewDetailScreen })));

const Stack = createStackNavigator<ComponentStackParamList>();

// 包装懒加载组件
const LazyButtonDetailScreen = () => (
    <Suspense fallback={<LoadingScreen />}>
      <ButtonDetailScreen />
    </Suspense>
);

const LazyTextDetailScreen = () => (
    <Suspense fallback={<LoadingScreen />}>
      <TextDetailScreen />
    </Suspense>
);

const LazyInputDetailScreen = () => (
    <Suspense fallback={<LoadingScreen />}>
      <InputDetailScreen />
    </Suspense>
);

const LazyListDetailScreen = () => (
    <Suspense fallback={<LoadingScreen />}>
      <ListDetailScreen1 />
    </Suspense>
);

const LazyListDetailScreen2 = () => (
    <Suspense fallback={<LoadingScreen />}>
        <ListDetailScreen2 />
    </Suspense>
);

const LazyListDetailScreen3 = () => (
    <Suspense fallback={<LoadingScreen />}>
        <ListDetailScreen3 />
    </Suspense>
);
const LazyListDetailScreen4 = () => (
  <Suspense fallback={<LoadingScreen />}>
      <ListDetailScreen4 />
  </Suspense>
);

const LazyListDetailScreen5 = () => (
  <Suspense fallback={<LoadingScreen />}>
      <ListDetailScreen5 />
  </Suspense>
);

const LazyImageDetailScreen = () => (
    <Suspense fallback={<LoadingScreen />}>
      <ImageDetailScreen />
    </Suspense>
);

const LazyNavigationDetailScreen = () => (
    <Suspense fallback={<LoadingScreen />}>
      <NavigationDetailScreen />
    </Suspense>
);

const LazyModalDetailScreen = () => (
    <Suspense fallback={<LoadingScreen />}>
      <ModalDetailScreen />
    </Suspense>
);

const LazyScrollViewDetailScreen = () => (
    <Suspense fallback={<LoadingScreen />}>
      <ScrollViewDetailScreen />
    </Suspense>
);

// 主组件页面，包含嵌套导航
export const HomeScreen: React.FC = () => {
  usePageReport('HomeScreen');
    // const { colors } = useTheme();

  return (
      <Stack.Navigator
          initialRouteName="ComponentList"
          screenOptions={({route}) => ({
              headerShown: route.name !== 'ComponentList',
              headerTitleAlign: 'center',
              // headerStyle: {backgroundColor: colors.background, borderWidth: 2, borderColor: colors.border},
              // headerTitleStyle:{color:colors.text},
          })}

      >
        <Stack.Screen
            name="ComponentList"
            component={ComponentListScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="ButtonDetail" component={LazyButtonDetailScreen} options={{ title: '按钮组件' }} />
        <Stack.Screen name="TextDetail" component={LazyTextDetailScreen} options={{ title: '文本组件' }} />
        <Stack.Screen name="InputDetail" component={LazyInputDetailScreen} options={{ title: '输入框组件' }} />
        <Stack.Screen name="ListDetail1" component={LazyListDetailScreen} options={{ title: '列表组件1' }} />
        <Stack.Screen name="ListDetail2" component={LazyListDetailScreen2} options={{ title: '列表组件2' }} />
        <Stack.Screen name="ListDetail3" component={LazyListDetailScreen3} options={{ title: '列表组件3' }} />
        <Stack.Screen name="ListDetail4" component={LazyListDetailScreen4} options={{ title: '列表组件4' }} />
        <Stack.Screen name="ListDetail5" component={LazyListDetailScreen5} options={{ title: '列表组件5' }} />
        <Stack.Screen name="ImageDetail" component={LazyImageDetailScreen} options={{ title: '图片组件' }} />
        <Stack.Screen name="NavigationDetail" component={LazyNavigationDetailScreen} options={{ title: '导航组件' }} />
        <Stack.Screen name="ModalDetail" component={LazyModalDetailScreen} options={{ title: '弹窗组件' }} />
        <Stack.Screen name="ScrollViewDetail" component={LazyScrollViewDetailScreen} options={{ title: '滚动视图' }} />
      </Stack.Navigator>
  );
};

