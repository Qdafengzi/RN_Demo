import {Text, TouchableOpacity, View} from 'react-native';
import {create} from 'zustand/react';
import {immer} from 'zustand/middleware/immer';
import {subscribeWithSelector} from 'zustand/middleware';
import React, {useEffect} from 'react';
import {createThemedStyles, useTheme} from '../../theme/ThemeContext.tsx';

interface StoreState {
    count: number;
    increase: () => void;
    decrease: () => void;
}

//最基础的
const useStoreDemo = create<StoreState>((set) => ({
    count: 0,
    increase: () => set((state: StoreState) => ({count: state.count + 1})),
    decrease: () => set((state: StoreState) => ({count: state.count - 1})),
}));

// 带有中间件的 可以直接更新
const useStoreWithImmer = create<StoreState>()(
    immer((set) => ({
        count: 0,
        increase: () => set((state) => {
            console.log('increase count', state.count);
            state.count += 1;
        }),
        decrease: () => set((state) => {
            state.count -= 1;
        }),
    }))
);

//带有订阅的可以监听某一个数值的变化 ， 带有中间件的 可以直接更新
const useStoreWidthSubAndImmer = create(
    subscribeWithSelector(
        immer<StoreState>((set) => ({
            count: 0,
            increase: () => set((state) => {
                console.log('increase count', state.count);
                state.count += 1;
            }),
            decrease: () => set((state) => {
                state.count -= 1;
            }),
        }))
    )
);

useStoreWidthSubAndImmer.subscribe(
    (state) => state.count,
    (count) => {
        console.log(`在外面订阅 count 有变化:${count}`);
    }
);


export function ZustandDemo(): React.JSX.Element {
    useTheme();
    const styles = useStyles();

    const increaseWithSubAndImmer = useStoreWidthSubAndImmer((state) => state.increase);
    const countWidthSubAndImmer = useStoreWidthSubAndImmer((state) => state.count);

    const increaseWithImmer = useStoreWithImmer((state) => state.increase);
    const countWithImmer = useStoreWithImmer((state) => state.count);

    const increase = useStoreDemo((state) => state.increase);
    const count = useStoreDemo((state) => state.count);


    useEffect(() => {
        // 只订阅一次
        const unsubscribe = useStoreWidthSubAndImmer.subscribe(
            (state) => state.count,
            (count) => {
                console.log(`count 有变化:${count}`);
            }
        );

        // 清理订阅
        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>bears:{count}</Text>
            <TouchableOpacity
                style={styles.container}
                activeOpacity={0.8} onPress={increase}>
                <View style={styles.box}>
                    <Text style={styles.text}>sample 增加</Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.title}>bears:{countWithImmer}</Text>
            <TouchableOpacity
                style={styles.container}
                activeOpacity={0.8} onPress={increaseWithImmer}>
                <View style={styles.box}>
                    <Text style={styles.text}>with immer 增加</Text>
                </View>
            </TouchableOpacity>

            <Text style={styles.title}>bears:{countWidthSubAndImmer}</Text>
            <TouchableOpacity
                style={styles.container}
                activeOpacity={0.8} onPress={increaseWithSubAndImmer}>
                <View style={styles.box}>
                    <Text style={styles.text}>with sub and immer 增加</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const useStyles = createThemedStyles((_) => ({
    screen: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
    box: {
        width: '100%',
        backgroundColor: 'blue',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
    },
    title: {
        marginTop: 20,
    }
}));
