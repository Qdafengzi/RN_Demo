import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../theme/ThemeContext';
import {
    buffer,
    bufferCount,
    bufferTime,
    catchError,
    combineLatest,
    concatMap,
    debounceTime,
    delay,
    distinct,
    distinctUntilChanged,
    exhaustMap,
    filter,
    finalize,
    first,
    forkJoin,
    interval,
    last,
    map,
    merge,
    mergeMap,
    of,
    reduce,
    retry,
    scan,
    skip,
    Subscription,
    switchMap,
    take,
    tap,
    throttleTime,
    timeout,
    timer,
    zip,
} from 'rxjs';

const RxJSOperatorsDemo: React.FC = () => {
    const {colors} = useTheme();
    const [output, setOutput] = useState<string[]>([]);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const scrollViewRef = useRef<ScrollView>(null);
    // const [searchText, setSearchText] = useState('');

     const addOutput = (text: string) => {
         setOutput(prev => {
             const newOutput = [...prev, `${new Date().toLocaleTimeString()}: ${text}`];
             // 自动滚动到底部
             setTimeout(() => {
                 scrollViewRef.current?.scrollToEnd({ animated: true });
             }, 100);
             return newOutput;
         });
     };

    const clearOutput = () => setOutput([]);

    const clearSubscriptions = () => {
        subscriptions.forEach(sub => sub.unsubscribe());
        setSubscriptions([]);
    };

    // 1. 转换操作符
    const demonstrateTransformOperators = () => {
        addOutput('=== 转换操作符 ===');

        // map - 转换每个值
        const mapObservable = of(1, 2, 3, 4, 5).pipe(
            map(x => x * 2)
        );
        const mapSub = mapObservable.subscribe(value => addOutput(`map: ${value}`));
        setSubscriptions(prev => [...prev, mapSub]);

        // tap - 副作用操作
        const tapObservable = of(1, 2, 3).pipe(
            tap(value => addOutput(`tap 副作用: ${value}`)),
            map(x => x * 2)
        );
        const tapSub = tapObservable.subscribe(value => addOutput(`tap 结果: ${value}`));
        setSubscriptions(prev => [...prev, tapSub]);

        // scan - 累积操作
        const scanObservable = of(1, 2, 3, 4, 5).pipe(
            scan((acc, curr) => acc + curr, 0)
        );
        const scanSub = scanObservable.subscribe(value => addOutput(`scan 累积: ${value}`));
        setSubscriptions(prev => [...prev, scanSub]);

        // reduce - 最终累积
        const reduceObservable = of(1, 2, 3, 4, 5).pipe(
            reduce((acc, curr) => acc + curr, 0)
        );
        const reduceSub = reduceObservable.subscribe(value => addOutput(`reduce 最终: ${value}`));
        setSubscriptions(prev => [...prev, reduceSub]);
    };

    // 2. 过滤操作符
    const demonstrateFilterOperators = () => {
        addOutput('=== 过滤操作符 ===');

        // filter - 条件过滤
        const filterObservable = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
            filter(x => x % 2 === 0)
        );
        const filterSub = filterObservable.subscribe(value => addOutput(`filter 偶数: ${value}`));
        setSubscriptions(prev => [...prev, filterSub]);

        // take - 取前几个
        const takeObservable = of(1, 2, 3, 4, 5).pipe(
            take(3)
        );
        const takeSub = takeObservable.subscribe(value => addOutput(`take 前3个: ${value}`));
        setSubscriptions(prev => [...prev, takeSub]);

        // skip - 跳过前几个
        const skipObservable = of(1, 2, 3, 4, 5).pipe(
            skip(2)
        );
        const skipSub = skipObservable.subscribe(value => addOutput(`skip 跳过前2个: ${value}`));
        setSubscriptions(prev => [...prev, skipSub]);

        // distinct - 去重
        const distinctObservable = of(1, 1, 2, 2, 3, 3, 4, 4).pipe(
            distinct()
        );
        const distinctSub = distinctObservable.subscribe(value => addOutput(`distinct 去重: ${value}`));
        setSubscriptions(prev => [...prev, distinctSub]);

        // first - 第一个值
        const firstObservable = of(1, 2, 3, 4, 5).pipe(
            first()
        );
        const firstSub = firstObservable.subscribe(value => addOutput(`first 第一个: ${value}`));
        setSubscriptions(prev => [...prev, firstSub]);

        // last - 最后一个值
        const lastObservable = of(1, 2, 3, 4, 5).pipe(
            last()
        );
        const lastSub = lastObservable.subscribe(value => addOutput(`last 最后一个: ${value}`));
        setSubscriptions(prev => [...prev, lastSub]);
    };

    // 3. 时间相关操作符
    const demonstrateTimeOperators = () => {
        addOutput('=== 时间相关操作符 ===');

        // debounceTime - 防抖
        const debounceObservable = interval(100).pipe(
            take(10),
            debounceTime(200)
        );
        const debounceSub = debounceObservable.subscribe(value => addOutput(`debounce: ${value}`));
        setSubscriptions(prev => [...prev, debounceSub]);

        // throttleTime - 节流
        const throttleObservable = interval(100).pipe(
            take(10),
            throttleTime(300)
        );
        const throttleSub = throttleObservable.subscribe(value => addOutput(`throttle: ${value}`));
        setSubscriptions(prev => [...prev, throttleSub]);

        // delay - 延迟
        const delayObservable = of(1, 2, 3).pipe(
            delay(1000)
        );
        const delaySub = delayObservable.subscribe(value => addOutput(`delay: ${value}`));
        setSubscriptions(prev => [...prev, delaySub]);

        // timeout - 超时
        const timeoutObservable = timer(2000).pipe(
            timeout(1000),
            catchError(error => {
                addOutput(`timeout 错误: ${error.message}`);
                return of('超时恢复');
            })
        );
        const timeoutSub = timeoutObservable.subscribe(value => addOutput(`timeout: ${value}`));
        setSubscriptions(prev => [...prev, timeoutSub]);
    };

    // 4. 组合操作符
    const demonstrateCombinationOperators = () => {
        addOutput('=== 组合操作符 ===');

        // merge - 合并多个流
        const source1 = interval(1000).pipe(map(x => `Source1: ${x}`), take(3));
        const source2 = interval(1500).pipe(map(x => `Source2: ${x}`), take(2));
        const merged = merge(source1, source2);
        const mergeSub = merged.subscribe(value => addOutput(`merge: ${value}`));
        setSubscriptions(prev => [...prev, mergeSub]);

        // combineLatest - 组合最新值
        const sourceA = of(1, 2, 3);
        const sourceB = of('A', 'B', 'C');
        const combined = combineLatest([sourceA, sourceB]);
        const combineSub = combined.subscribe(([a, b]) => addOutput(`combineLatest: ${a}-${b}`));
        setSubscriptions(prev => [...prev, combineSub]);

        // zip - 按索引组合
        const zipped = zip(sourceA, sourceB);
        const zipSub = zipped.subscribe(([a, b]) => addOutput(`zip: ${a}-${b}`));
        setSubscriptions(prev => [...prev, zipSub]);

        // forkJoin - 等待所有完成
        const requests = [1, 2, 3].map(id => of(`数据${id}`).pipe(delay(id * 500)));
        const forked = forkJoin(requests);
        const forkSub = forked.subscribe(results => addOutput(`forkJoin: ${results.join(', ')}`));
        setSubscriptions(prev => [...prev, forkSub]);
    };

    // 5. 高级映射操作符
    const demonstrateAdvancedMapOperators = () => {
        addOutput('=== 高级映射操作符 ===');

        // switchMap - 切换映射（取消前一个）
        const switchMapObservable = interval(1000).pipe(
            take(3),
            switchMap(x => of(`switchMap-${x}`).pipe(delay(500)))
        );
        const switchSub = switchMapObservable.subscribe(value => addOutput(`switchMap: ${value}`));
        setSubscriptions(prev => [...prev, switchSub]);

        // mergeMap - 合并映射（并发）
        const mergeMapObservable = of(1, 2, 3).pipe(
            mergeMap(x => of(`mergeMap-${x}`).pipe(delay(x * 200)))
        );
        const mergeMapSub = mergeMapObservable.subscribe(value => addOutput(`mergeMap: ${value}`));
        setSubscriptions(prev => [...prev, mergeMapSub]);

        // concatMap - 连接映射（顺序）
        const concatMapObservable = of(1, 2, 3).pipe(
            concatMap(x => of(`concatMap-${x}`).pipe(delay(x * 200)))
        );
        const concatMapSub = concatMapObservable.subscribe(value => addOutput(`concatMap: ${value}`));
        setSubscriptions(prev => [...prev, concatMapSub]);

        // exhaustMap - 耗尽映射（忽略新值）
        const exhaustMapObservable = interval(500).pipe(
            take(5),
            exhaustMap(x => of(`exhaustMap-${x}`).pipe(delay(1000)))
        );
        const exhaustMapSub = exhaustMapObservable.subscribe(value => addOutput(`exhaustMap: ${value}`));
        setSubscriptions(prev => [...prev, exhaustMapSub]);
    };

    // 6. 错误处理操作符
    const demonstrateErrorHandlingOperators = () => {
        addOutput('=== 错误处理操作符 ===');

        // catchError - 捕获错误
        const catchErrorObservable = of(1, 2, 3).pipe(
            map(x => {
                if (x === 2) {
                    throw new Error('出错了！');
                }
                return x;
            }),
            catchError(error => {
                addOutput(`捕获错误: ${error.message}`);
                return of('错误恢复');
            })
        );
        const catchSub = catchErrorObservable.subscribe(value => addOutput(`catchError: ${value}`));
        setSubscriptions(prev => [...prev, catchSub]);

        // retry - 重试
        const retryObservable = of(1, 2, 3).pipe(
            map(x => {
                if (x === 2) {
                    throw new Error('重试错误！');
                }
                return x;
            }),
            retry(2),
            catchError(error => of(`重试失败: ${error.message}`))
        );
        const retrySub = retryObservable.subscribe(value => addOutput(`retry: ${value}`));
        setSubscriptions(prev => [...prev, retrySub]);

        // finalize - 最终处理
        const finalizeObservable = of(1, 2, 3).pipe(
            finalize(() => addOutput('finalize: 清理完成'))
        );
        const finalizeSub = finalizeObservable.subscribe(value => addOutput(`finalize: ${value}`));
        setSubscriptions(prev => [...prev, finalizeSub]);
    };

    // 7. 缓冲操作符
    const demonstrateBufferOperators = () => {
        addOutput('=== 缓冲操作符 ===');

        // buffer - 缓冲
        const bufferObservable = interval(200).pipe(
            take(10),
            buffer(interval(1000))
        );
        const bufferSub = bufferObservable.subscribe(values => addOutput(`buffer: [${values.join(', ')}]`));
        setSubscriptions(prev => [...prev, bufferSub]);

        // bufferTime - 时间缓冲
        const bufferTimeObservable = interval(300).pipe(
            take(10),
            bufferTime(1000)
        );
        const bufferTimeSub = bufferTimeObservable.subscribe(values => addOutput(`bufferTime: [${values.join(', ')}]`));
        setSubscriptions(prev => [...prev, bufferTimeSub]);

        // bufferCount - 数量缓冲
        const bufferCountObservable = interval(200).pipe(
            take(10),
            bufferCount(3)
        );
        const bufferCountSub = bufferCountObservable.subscribe(values => addOutput(`bufferCount: [${values.join(', ')}]`));
        setSubscriptions(prev => [...prev, bufferCountSub]);
    };

    // 8. 搜索防抖演示
    const demonstrateSearchDebounce = () => {
        addOutput('=== 搜索防抖演示 ===');

        // 模拟搜索 API
        const searchAPI = (query: string) => {
            return of(`搜索结果: ${query}`).pipe(delay(300));
        };

        // 创建搜索流
        const searchObservable = of('r', 'rx', 'rxjs').pipe(
            debounceTime(200),
            distinctUntilChanged(),
            switchMap(query =>
                query ? searchAPI(query) : of('')
            )
        );

        const searchSub = searchObservable.subscribe(result => {
            if (result) {
             addOutput(result);
         }
        });
        setSubscriptions(prev => [...prev, searchSub]);
    };

    // 清理函数
    useEffect(() => {
        return () => {
            subscriptions.forEach(sub => sub.unsubscribe());
        };
    });

    return (
        <ScrollView style={[styles.container, {backgroundColor: colors.background}]}>
            <Text style={[styles.title, {color: colors.text}]}>RxJS 操作符演示</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateTransformOperators}
                >
                    <Text style={styles.buttonText}>转换操作符</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateFilterOperators}
                >
                    <Text style={styles.buttonText}>过滤操作符</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateTimeOperators}
                >
                    <Text style={styles.buttonText}>时间操作符</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateCombinationOperators}
                >
                    <Text style={styles.buttonText}>组合操作符</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateAdvancedMapOperators}
                >
                    <Text style={styles.buttonText}>高级映射</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateErrorHandlingOperators}
                >
                    <Text style={styles.buttonText}>错误处理</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateBufferOperators}
                >
                    <Text style={styles.buttonText}>缓冲操作符</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateSearchDebounce}
                >
                    <Text style={styles.buttonText}>搜索防抖</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#FF3B30'}]}
                    onPress={clearSubscriptions}
                >
                    <Text style={styles.buttonText}>取消所有订阅</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#8E8E93'}]}
                    onPress={clearOutput}
                >
                    <Text style={styles.buttonText}>清空输出</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.outputContainer, {backgroundColor: colors.card, borderColor: colors.border}]}>
                <Text style={[styles.outputTitle, {color: colors.text}]}>输出日志:</Text>
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.logScrollView}
                    showsVerticalScrollIndicator={true}
                >
                    {output.map((line, index) => (
                        <Text key={index} style={[styles.outputText, {color: colors.text}]}>{line}</Text>
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        marginBottom: 8,
        minWidth: '48%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '500',
    },
     outputContainer: {
         padding: 12,
         borderRadius: 8,
         borderWidth: 1,
         height: 300, // 固定高度
     },
     outputTitle: {
         fontSize: 16,
         fontWeight: 'bold',
         marginBottom: 8,
     },
     logScrollView: {
         flex: 1,
     },
     outputText: {
         fontSize: 12,
         marginBottom: 2,
         fontFamily: 'monospace',
     },
});

export default RxJSOperatorsDemo;
