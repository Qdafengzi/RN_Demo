import {StyleSheet, Text, View} from "react-native"
import CustomViewGroup from "../../../../specs/RTNViewGroupNativeComponent"
import {useTheme} from "@react-navigation/native";
import {usePageReport} from "../../../hooks/usePageReport";
import CenteredTextNativeComponent from "../../../../specs/CenteredTextNativeComponent.ts";
import {useEffect, useState} from "react";

export const NativeTextScreen = () => {
    const {colors} = useTheme();
    const {reportEvent} = usePageReport('ButtonDetailScreen');
    const [text,setText] = useState("")

    useEffect(() => {
        setText("总书记指出，要搞好统筹扩大内需和深化供给侧结构性改革，形成需求牵引供给、供给创造需求的更高水平动态平...详情");
    }, []);

    return (
        <View style={[styles.detailContainer, {backgroundColor: colors.background}]}>
            <CenteredTextNativeComponent text="原生控件" style={{width: 200, height: 50}}/>

            <View style={{height: 10, backgroundColor: '#ff00ff', width: '100%'}}/>

            <CustomViewGroup style={{
                width: '100%',
                height: 500,
                marginTop: 20,
                backgroundColor: 'red',
                justifyContent: 'flex-start'
            }}
                             color={'#167520'} onChildLoaded={(data) => {
                console.log("onChildLoaded------", data)
            }}>
                <View style={{width: "100%", backgroundColor: 'blue', justifyContent: 'flex-start',}}>
                    <Text style={{
                        fontSize: 16,
                        lineHeight: 24,
                        fontWeight: '500',
                        color: "white"
                    }}>{text}</Text>
                    <Text>777</Text>
                    <Text>777</Text>
                    <Text>777</Text>
                    <Text>777</Text>
                    <Text>777</Text>
                    <Text>777</Text>
                    <Text>777</Text>
                </View>
            </CustomViewGroup>

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
