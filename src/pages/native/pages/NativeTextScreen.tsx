import { StyleSheet, View } from "react-native"
import CenteredTextNativeComponent from "../../../../specs/CenteredTextNativeComponent"
import { useTheme } from "@react-navigation/native";
import { usePageReport } from "../../../hooks/usePageReport";

export const NativeTextScreen = () => {
    const { colors } = useTheme();
    const { reportEvent } = usePageReport('ButtonDetailScreen');

    return (
        <View style={[styles.detailContainer, {backgroundColor: colors.background}]}>
            <CenteredTextNativeComponent text="原生控件" style={{ width: 200, height: 50 }} />
        </View>
    )

}

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
})