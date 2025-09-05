import {Pressable, Text, View} from 'react-native';
import {useReducer} from 'react';

const initialScore = {
        id: 1,
        score: 0,
        name: 'John',
    }
;

const reducer = (item: any, action: any) => {
    switch (action.type) {
        case 'INCREASE':
            return {...item, score: item.score + 1};
        default:
            return item;
    }
};

export const ReducerDemo = () => {
    const [score, dispatch] = useReducer(reducer, initialScore);

    const handleIncrease = (item: any) => {
        dispatch({type: 'INCREASE', id: item.id});
    };

    return (
        <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black'}}>{score.score}</Text>

            <Pressable style={{
                // backgroundColor: '#5ca664',

                marginHorizontal: 16,
                width: '100%',
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20,
                paddingVertical: 10,
                paddingHorizontal:20,
            }} onPress={handleIncrease}>
                <Text style={{color: 'white',
                    backgroundColor:'rgb(241,90,84)',
                    borderRadius: 10,
                    paddingVertical: 10,
                    paddingHorizontal:20,
                    width: '100%', textAlign: 'center'}}>增加</Text>
            </Pressable>
        </View>
    );
}
