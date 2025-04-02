import { useTheme } from '../../theme/ThemeContext';
import { StyleSheet, Text, View } from "react-native";

export function OtherScreen(): React.JSX.Element {
    const { colors } = useTheme();
    return (
        <View style={styles.screen}>
            <Text style={{ color: colors.primary }}>
                Other content
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