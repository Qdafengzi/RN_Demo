import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../theme/ThemeContext';
import React, {useState} from 'react';
import Modal from 'react-native-modal';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const ModalDetailScreen: React.FC = () => {
    const {colors} = useTheme();
    const [show, setShow] = useState(false);

    return (
        <View style={[styles.detailContainer, {backgroundColor: colors.background}]}>
            <Modal
                coverScreen={true}
                statusBarTranslucent={true}
                isVisible={show}
                deviceHeight={HEIGHT}
                deviceWidth={WIDTH}
                onDismiss={()=>{}}
                onBackdropPress={()=>{}}
            >
                <View style={{flex:0.5,width:"80%",height:"50%",backgroundColor:'#cbcbcc',alignSelf:'center',borderRadius:12}}>
                    <Text>我是弹窗</Text>
                    <Button title={'关闭弹窗'} onPress={()=>{
                        setShow(false);
                    }}></Button>
                </View>
            </Modal>
            <Button title={'显示弹窗'} onPress={()=>{
                setShow(true);
            }}></Button>
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
