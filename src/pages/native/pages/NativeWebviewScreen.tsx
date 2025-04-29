import { StyleSheet, View } from "react-native"
import { useTheme } from "@react-navigation/native";
import { usePageReport } from "../../../hooks/usePageReport";
import WebViewNativeComponent from "../../../../specs/WebViewNativeComponent";

export const NativeWebviewScreen = () => {
    const { colors } = useTheme();
    const { reportEvent } = usePageReport('ButtonDetailScreen');

    return (
        <View style={[styles.detailContainer, { backgroundColor: colors.background }]}>
            <WebViewNativeComponent
                style={{ width: '100%', height: "100%" }}
                sourceURL='www.google.com'
                onScriptLoaded={() => {
                    console.log('script loaded');
                }}
            />

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