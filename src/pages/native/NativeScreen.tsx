import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import React from 'react';

export function NativeScreen(): React.JSX.Element {
    const { colors } = useTheme();
    return (
        <View style={styles.screen}>
            <Text style={{ color: colors.primary }}>
                Native content
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
