import { createThemedStyles, useTheme } from '../../theme/ThemeContext';
import {Button, Text, View} from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * 外部的组件 不会刷新
 * @returns 
 */
const HeaderViewOuter = memo(() => {
    console.log('HeaderViewOuter 不会刷新');
    return <View style={{ height: 40, backgroundColor: 'blue', justifyContent: 'center' }}>
        <Text style={{ color: 'white' }}>外部 HeaderViewOuter 不会刷新</Text>
    </View>;
});

export function OtherScreen(): React.JSX.Element {
    const { colors } = useTheme();
    const styles = useStyles();
    const [number,setNumber] =useState(0)
    const [count,setCount] =useState(0)
    const numberRef = useRef(0);

    useEffect(()=>{
        console.log("页面加载\n\n");
        console.log("  ");
    })


	  // 使用 useCallback 记忆化 HeaderView 组件
    // const HeaderViewInner1 = useCallback(() => {
    //     console.log('内部 HeaderViewInner1 会刷新 ');
    //     return <View style={styles.box}>
    //         <Text style={styles.text}>内部 HeaderViewInner1 会刷新 值也变化 {number}</Text>
    //     </View>;
    // }, [number]);

    // const HeaderViewInner2 = useCallback(() => {
    //     console.log('内部 HeaderViewInner2 会刷新 但number 值不变 ');
    //     return <View style={styles.box}>
    //         <Text style={styles.text}>内部 HeaderViewInner2 会刷新 但number 值不变 {number}</Text>
    //     </View>;
    // }, []);


    /**
    * 当依赖有值时 会刷新 
    */
    // const headerView1 = useMemo(() => {
    //     console.log('HeaderView1');
    //     return <View style={styles.box}>
    //         <Text style={styles.text}>header 有依赖 会刷新{number}</Text>
    //     </View>;
    // }, [number]);  
    

    /**
     * 当依赖为空时 不会刷新 即使引用了 state 也不会刷新
     */
    // const headerView2 = useMemo(() => {
    //     console.log('HeaderView2');
    //     return <View style={styles.box}>
    //         <Text style={styles.text}>header 依赖为空 不会刷新 {number}</Text>
    //     </View>;
    // }, []); 

    /**
     * 当依赖为Ref类型的时候 页面会刷新
     */
    // const headerView3 = useMemo(() => {
    //     console.log('headerView3');
    //     return <View style={styles.box}>
    //         <Text style={styles.text}>header 依赖Ref类型的是否会变化  {numberRef.current}</Text>
    //     </View>;
    // }, [numberRef.current]); 

    /**
     * 当没有依赖就不会属性 无论是 Ref 还是 state 
     */
    const headerView4 = useMemo(() => {
        console.log('headerView4');
        return <View style={styles.box}>
            <Text style={styles.text}>header 不依赖Ref类型的是否会变化  {numberRef.current}</Text>
        </View>;
    }, []); 


    const headerView5Child= useMemo(() => {
        console.log('headerView5Child');
        return <View style={styles.box}>
            <Text style={styles.text}>headerView5Child count: {count}</Text>
        </View>;
    }, [count]); 

    const headerView5Child1= useMemo(() => {
        console.log('headerView5Child');
        return <View style={styles.box}>
            <Text style={styles.text}>headerView5Child1 count: {count}</Text>
        </View>;
    }, []); 

    const headerView5= useMemo(() => {
        console.log('headerView4');
        return <View style={{backgroundColor:'#ff00ff'}}>
            {headerView5Child}
            {headerView5Child1}
            <Text style={styles.text}>header 不依赖Ref类型的是否会变化  number:{number}</Text>
        </View>;
    }, [number]); 


    function addNumber(){
        setNumber(number+1);
        numberRef.current = number+1;
        setCount(count+1);
    }
  
    
    return (
        <View style={styles.screen}>
            {/* <HeaderViewOuter/> */}

            {/* <HeaderViewInner1/>
            <HeaderViewInner2/> */}

            {/* {headerView1} */}
            {/* {headerView2} */}
            {/* {headerView3} */}
            {/* {headerView4} */}
            {headerView5}

            <Text style={{ color: colors.primary }}>
                Other content number:{number}
            </Text>

            {/* <Button title="增加" onPress={() => setNumber(number + 1)} /> */}
            <Button title="增加" onPress={addNumber} />
            <Button title="一直设置一样的数据是否变化 结果是不刷新页面" onPress={()=>setNumber(99)}/>
        </View>
    );
}


const useStyles = createThemedStyles((_) => ({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    box:{
        marginTop: 10,
        justifyContent: 'center',
        height: 40,
        backgroundColor: 'blue'
    },
    text:{
        color:'white'
    }
}));
