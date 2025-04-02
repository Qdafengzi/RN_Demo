// 定义颜色主题类型
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