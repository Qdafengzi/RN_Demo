import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../theme/ThemeContext";

export const ListDetailScreen: React.FC = () => {
    const { colors } = useTheme();
    return (
        <View style={[styles.detailContainer, { backgroundColor: colors.background }]}>
            <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>列表组件详情</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 16,
        textAlign: 'center',
    },
    listContainer: {
        padding: 16,
    },
    card: {
        padding: 16,
        margin: 8,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
    },
    detailContainer: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 8,
        marginVertical: 8,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
    },
});