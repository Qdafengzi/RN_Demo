import { createThemedStyles, useTheme } from '../../theme/ThemeContext';
import {Text, View} from 'react-native';
import React from 'react';

export function OtherScreen(): React.JSX.Element {
    const { colors } = useTheme();
    const styles = useStyles();
    return (
        <View style={styles.screen}>
            <Text style={{ color: colors.primary }}>
                Other content
            </Text>
        </View>
    );
}


const useStyles = createThemedStyles((_) => ({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
}));
