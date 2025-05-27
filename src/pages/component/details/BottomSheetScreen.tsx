import { Button, Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const BottomSheetScreen: React.FC = () => {
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [show,setShow] = useState(false);

    useEffect(() => {
        if (show) {
            bottomSheetModalRef.current?.present();
        }else{
            bottomSheetModalRef.current?.dismiss();
        }
    },[show])

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        setShow(show => !show);
        // bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    // renders
    return (

        <View style={{ flex: 1 }}>
            <Button
                onPress={handlePresentModalPress}
                title="Present Modal"
                color="black"
            />

            <BottomSheetModalProvider>
                <BottomSheetModal
                    snapPoints={[h * 0.9]}
                    enableHandlePanningGesture={false}
                    enableOverDrag={false}
                    enablePanDownToClose={false}
                    handleIndicatorStyle={{width: 0,height: 0}}
                    enableContentPanningGesture={false}
                    containerStyle={{
                        backgroundColor:'red'
                    }}
                    backgroundStyle={{
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                    }}
                    handleStyle={{
                        padding: 0,
                        margin: 0, 
                    }}
                    ref={bottomSheetModalRef}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetView 
                      style={styles.contentContainer}>
                        <Text>Awesome 🎉</Text>
                        <Text>Awesome 🎉</Text>
                        <Text>Awesome 🎉</Text>
                        <Text>Awesome 🎉</Text>
                        <Text>Awesome 🎉</Text>
                        <Text>Awesome 🎉</Text>
                        <Text>Awesome 🎉</Text>
                        <Text>Awesome 🎉</Text>
                        <Text>Awesome 🎉</Text>
                        <Text>Awesome 🎉</Text>
                        <Text>Awesome 🎉</Text>
                        <Text>Awesome 🎉</Text>
                        <Text>Awesome 🎉</Text>
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>

            {/* <GestureHandlerRootView style={styles.container}>
                
            </GestureHandlerRootView> */}
        </View>



    );
};
const h = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        height: h * 0.8
    },
});
