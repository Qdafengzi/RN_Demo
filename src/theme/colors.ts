// 定义颜色主题类型
import {DefaultTheme, Theme} from '@react-navigation/native';
import {Platform} from 'react-native';

export type ThemeColors = {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    secondary: string;
    accent: string;
};

// 定义应用的颜色主题
export const LightTheme: ThemeColors = {
    primary: '#e91e63',
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#333333',
    border: '#DDDDDD',
    notification: '#FF3B30',
    secondary: '#007AFF',
    accent: '#FFD700',
};

export const DarkTheme: ThemeColors = {
    primary: '#ff4081',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    border: '#333333',
    notification: '#FF453A',
    secondary: '#007AFF',
    accent: '#FFD700',
};

// 根据当前模式获取主题颜色
export const getThemeColors = (isDark: boolean): ThemeColors => {
    return isDark ? DarkTheme : LightTheme;
};


export const MyTheme: Theme = {
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FFFFFFFF',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: '#FF000000',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
    fonts: Platform.select({
        web: {
            regular: {
                fontFamily: 'DMSans-Regular',
                fontWeight: '400',
            },
            medium: {
                fontFamily: 'DMSans-Medium',
                fontWeight: '500',
            },
            bold: {
                fontFamily: 'DMSans-Bold',
                fontWeight: '600',
            },
            heavy: {
                fontFamily: 'DMSans-SemiBold',
                fontWeight: '700',
            },
        },
        ios: {
            regular: {
                fontFamily: 'DMSans-Regular',
                fontWeight: '400',
            },
            medium: {
                fontFamily: 'DMSans-Medium',
                fontWeight: '500',
            },
            bold: {
                fontFamily: 'DMSans-Bold',
                fontWeight: '600',
            },
            heavy: {
                fontFamily: 'DMSans-SemiBold',
                fontWeight: '700',
            },
        },
        default: {
            regular: {
                fontFamily: 'DMSans-Regular',
                fontWeight: 'normal',
            },
            medium: {
                fontFamily: 'DMSans-Medium',
                fontWeight: 'normal',
            },
            bold: {
                fontFamily: 'DMSans-Bold',
                fontWeight: '600',
            },
            heavy: {
                fontFamily: 'DMSans-SemiBold',
                fontWeight: '700',
            },
        },
    }),
};
