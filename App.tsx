import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ComponentScreen } from './src/pages/component/ComponentPage';
import { NativeScreen } from './src/pages/native/NativePage';
import { OtherScreen } from './src/pages/other/OtherPage';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { Image } from 'react-native';

// 创建底部标签导航器
const Tab = createBottomTabNavigator();

function MainNavigator() {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === '首页') {
              // 使用本地图片作为图标
              return (
                <Image
                  source={require('./src/assets/images/home_active.png')}
                  style={{ width: size, height: size, tintColor: color, opacity: focused ? 1 : 0.5 }}
                />
              );
            } else if (route.name === '原生') {
              return (
                <Image
                  source={require('./src/assets/images/home_active.png')}
                  style={{ width: size, height: size, tintColor: color, opacity: focused ? 1 : 0.5 }}
                />
              );
            } else if (route.name === '其他') {
              return (
                <Image
                  source={require('./src/assets/images/home_active.png')}
                  style={{ width: size, height: size, tintColor: color, opacity: focused ? 1 : 0.5 }}
                />
              );
            }
            return null;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarStyle: {
            backgroundColor: colors.background,
          },
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
        <Tab.Screen name="首页" component={ComponentScreen} />
        <Tab.Screen name="原生" component={NativeScreen} />
        <Tab.Screen name="其他" component={OtherScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <MainNavigator />
    </ThemeProvider>
  );
}

export default App;