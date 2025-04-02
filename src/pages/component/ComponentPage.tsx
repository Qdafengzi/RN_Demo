import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export const ComponentScreen: React.FC = () => {
  // 获取当前主题颜色
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>组件页面</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});