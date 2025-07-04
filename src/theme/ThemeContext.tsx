import React, { createContext, useContext, useState, useEffect } from 'react';
import { ImageStyle, StatusBar, StyleSheet, TextStyle, useColorScheme, ViewStyle } from 'react-native';
import { ThemeColors, LightTheme, DarkTheme } from './colors';

interface ThemeContextType {
    colors: ThemeColors;
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const colorScheme = useColorScheme();
    const [isDark, setIsDark] = useState(colorScheme === 'dark');

    useEffect(() => {
        setIsDark(colorScheme === 'dark');
    }, [colorScheme]);

    const colors = isDark ? DarkTheme : LightTheme;

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
             <StatusBar
                barStyle={'dark-content'}
                backgroundColor={colors.background}
            />
            {children}
        </ThemeContext.Provider>
    );
};

// 自定义Hook，用于在组件中获取主题颜色
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

//有其他类型的样式 再添加
type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
// 修改 createThemedStyles 函数
export const createThemedStyles = <T extends NamedStyles<T>>(
    styleFactory: (colors: ThemeColors) => T
) => {
    return () => {
        const { colors } = useTheme();
        return StyleSheet.create(styleFactory(colors));
    };
};
