import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {useTheme} from '../../theme/ThemeContext';
import {
    asyncScheduler,
    auditTime,
    BehaviorSubject,
    bufferCount,
    catchError,
    combineLatest,
    debounceTime,
    delay,
    distinctUntilChanged,
    filter,
    finalize,
    from,
    groupBy,
    interval,
    last,
    map,
    mergeMap,
    Observable,
    of,
    queueScheduler,
    race,
    retryWhen,
    scan,
    share,
    shareReplay,
    Subject,
    Subscription,
    switchMap,
    take,
    tap,
    timer,
    window,
} from 'rxjs';

const RxJSAdvancedDemo: React.FC = () => {
    const {colors} = useTheme();
    const [output, setOutput] = useState<string[]>([]);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const scrollViewRef = useRef<ScrollView>(null);

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

    // 1. 高级操作符组合
    const demonstrateAdvancedOperators = () => {
        addOutput('=== 高级操作符组合 ===');

        // 复杂的操作符链
        const complexStream = interval(200).pipe(
            take(20),
            map(x => ({id: x, value: Math.random() * 100, category: x % 3})),
            filter(item => item.value > 30),
            distinctUntilChanged((prev, curr) => prev.category === curr.category),
            groupBy(item => item.category),
            mergeMap(group =>
                group.pipe(
                    bufferCount(3),
                    map(items => ({category: group.key, items}))
                )
            ),
            debounceTime(500)
        );

        const complexSub = complexStream.subscribe(result => {
            addOutput(`复杂流: 类别${result.category} - ${result.items.length}项`);
        });

        setSubscriptions(prev => [...prev, complexSub]);
    };

    // 2. 调度器演示
    const demonstrateSchedulers = () => {
        addOutput('=== 调度器演示 ===');

        // 异步调度器
        const asyncStream = of('异步').pipe(
            map(x => `${x}-${Date.now()}`),
            delay(0, asyncScheduler)
        );

        // 队列调度器
        const queueStream = of('队列').pipe(
            map(x => `${x}-${Date.now()}`),
            delay(0, queueScheduler)
        );

        // 立即调度器
        const immediateStream = of('立即').pipe(
            map(x => `${x}-${Date.now()}`)
        );

        const asyncSub = asyncStream.subscribe(value => addOutput(`调度器: ${value}`));
        const queueSub = queueStream.subscribe(value => addOutput(`调度器: ${value}`));
        const immediateSub = immediateStream.subscribe(value => addOutput(`调度器: ${value}`));

        setSubscriptions(prev => [...prev, asyncSub, queueSub, immediateSub]);
    };

    // 3. 多播和共享
    const demonstrateMulticast = () => {
        addOutput('=== 多播和共享演示 ===');

        // 创建可多播的流
        const source = interval(1000).pipe(
            take(5),
            map(x => `数据-${x}`),
            share() // 共享流
        );

        // 多个订阅者
        const sub1 = source.subscribe(value => addOutput(`多播订阅者1: ${value}`));
        const sub2 = source.subscribe(value => addOutput(`多播订阅者2: ${value}`));

        // 延迟订阅者
        setTimeout(() => {
            const sub3 = source.subscribe(value => addOutput(`多播订阅者3(延迟): ${value}`));
            setSubscriptions(prev => [...prev, sub3]);
        }, 2000);

        setSubscriptions(prev => [...prev, sub1, sub2]);
    };

    // 4. 高级错误处理
    const demonstrateAdvancedErrorHandling = () => {
        addOutput('=== 高级错误处理演示 ===');

        let attemptCount = 0;
        const flakyStream = interval(1000).pipe(
            take(5),
            map(x => {
                if (x === 2 && attemptCount < 2) {
                    attemptCount++;
                    throw new Error(`尝试 ${attemptCount} 失败`);
                }
                return `成功-${x}`;
            }),
            retryWhen(errors =>
                errors.pipe(
                    tap(error => addOutput(`重试原因: ${error.message}`)),
                    delay(1000),
                    take(2)
                )
            ),
            catchError(error => {
                addOutput(`最终错误: ${error.message}`);
                return of('使用备用数据');
            }),
            finalize(() => addOutput('错误处理流程结束'))
        );

        const errorSub = flakyStream.subscribe({
            next: value => addOutput(`错误处理结果: ${value}`),
            error: error => addOutput(`未处理错误: ${error.message}`),
            complete: () => addOutput('错误处理完成')
        });

        setSubscriptions(prev => [...prev, errorSub]);
    };

    // 5. 高级缓冲和窗口
    const demonstrateAdvancedBuffering = () => {
        addOutput('=== 高级缓冲和窗口演示 ===');

        // 窗口操作
        const windowStream = interval(200).pipe(
            take(20),
            window(interval(1000)),
            mergeMap(window =>
                window.pipe(
                    bufferCount(3),
                    map(buffer => ({window: Date.now(), data: buffer}))
                )
            )
        );

        const windowSub = windowStream.subscribe(result => {
            addOutput(`窗口数据: ${result.data.join(', ')}`);
        });

        // 分组缓冲
        const groupStream = interval(300).pipe(
            take(15),
            map(x => ({id: x, group: x % 3, value: Math.random() * 100})),
            groupBy(item => item.group),
            mergeMap(group =>
                group.pipe(
                    bufferCount(2),
                    map(items => ({group: group.key, items}))
                )
            )
        );

        const groupSub = groupStream.subscribe(result => {
            addOutput(`分组缓冲: 组${result.group} - ${result.items.length}项`);
        });

        setSubscriptions(prev => [...prev, windowSub, groupSub]);
    };

    // 6. 高级组合操作
    const demonstrateAdvancedCombination = () => {
        addOutput('=== 高级组合操作演示 ===');

        // 竞态条件
        const raceStream = race(
            timer(1000).pipe(map(() => '快速')),
            timer(2000).pipe(map(() => '慢速')),
            timer(1500).pipe(map(() => '中等'))
        );

        const raceSub = raceStream.subscribe(winner => {
            addOutput(`竞态获胜: ${winner}`);
        });

        // 条件组合
        const conditionalStream = interval(1000).pipe(
            take(5),
            switchMap(x => {
                if (x % 2 === 0) {
                    return of(`偶数: ${x}`);
                } else {
                    return timer(500).pipe(map(() => `奇数延迟: ${x}`));
                }
            })
        );

        const conditionalSub = conditionalStream.subscribe(value => {
            addOutput(`条件组合: ${value}`);
        });

        setSubscriptions(prev => [...prev, raceSub, conditionalSub]);
    };

    // 7. 高级过滤和转换
    const demonstrateAdvancedFiltering = () => {
        addOutput('=== 高级过滤和转换演示 ===');

        const data = [
            {id: 1, name: '张三', age: 25, department: 'IT'},
            {id: 2, name: '李四', age: 30, department: 'HR'},
            {id: 3, name: '王五', age: 28, department: 'IT'},
            {id: 4, name: '赵六', age: 35, department: 'Finance'},
            {id: 5, name: '钱七', age: 22, department: 'IT'}
        ];

        const advancedStream = from(data).pipe(
            // 按部门分组
            groupBy(person => person.department),
            mergeMap(group =>
                group.pipe(
                    // 过滤年龄大于25的
                    filter(person => person.age > 25),
                    // 按年龄排序
                    scan((acc: any[], person) => [...acc, person].sort((a, b) => a.age - b.age), [] as any[]),
                    // 取最后一个（完整排序结果）
                    last(),
                    // 转换格式
                    map(sorted => ({department: group.key, employees: sorted}))
                )
            )
        );

        const advancedSub = advancedStream.subscribe(result => {
            addOutput(`高级过滤: ${result.department}部门 - ${result.employees.length}人`);
            result.employees.forEach((emp: any) => {
                addOutput(`  - ${emp.name} (${emp.age}岁)`);
            });
        });

        setSubscriptions(prev => [...prev, advancedSub]);
    };

    // 8. 自定义操作符
    const demonstrateCustomOperators = () => {
        addOutput('=== 自定义操作符演示 ===');

        // 自定义操作符：累积平均值
        const averageOperator = () => {
            return (source: Observable<number>) => {
                return source.pipe(
                    scan((acc, value) => {
                        acc.sum += value;
                        acc.count++;
                        acc.average = acc.sum / acc.count;
                        return acc;
                    }, {sum: 0, count: 0, average: 0}),
                    map(acc => acc.average)
                );
            };
        };

        // 自定义操作符：智能去重
        const smartDistinct = (keySelector: (value: any) => any) => {
            return (source: Observable<any>) => {
                return source.pipe(
                    distinctUntilChanged((prev, curr) => keySelector(prev) === keySelector(curr))
                );
            };
        };

        // 使用自定义操作符
        const customStream = interval(500).pipe(
            take(10),
            map(() => Math.floor(Math.random() * 100)),
            averageOperator(),
            smartDistinct(x => Math.floor(x))
        );

        const customSub = customStream.subscribe(average => {
            addOutput(`自定义操作符 - 平均累积值: ${average.toFixed(2)}`);
        });

        setSubscriptions(prev => [...prev, customSub]);
    };

    // 9. 性能优化演示
    const demonstratePerformanceOptimization = () => {
        addOutput('=== 性能优化演示 ===');

        // 使用 shareReplay 优化
        const optimizedStream = interval(100).pipe(
            take(50),
            map(x => ({id: x, value: Math.random() * 1000})),
            shareReplay(10) // 缓存最后10个值
        );

        // 多个订阅者共享同一个流
        const sub1 = optimizedStream.subscribe(data => {
            if (data.id % 10 === 0) {
                addOutput(`优化流订阅者1: ID=${data.id}`);
            }
        });

        const sub2 = optimizedStream.subscribe(data => {
            if (data.id % 15 === 0) {
                addOutput(`优化流订阅者2: ID=${data.id}`);
            }
        });

        // 使用 auditTime 减少处理频率
        const auditedStream = interval(50).pipe(
            take(100),
            auditTime(500), // 每500ms最多处理一次
            map(x => `审计值: ${x}`)
        );

        const auditedSub = auditedStream.subscribe(value => {
            addOutput(`性能优化: ${value}`);
        });

        setSubscriptions(prev => [...prev, sub1, sub2, auditedSub]);
    };

    // 10. 复杂状态机演示
    const demonstrateStateMachine = () => {
        addOutput('=== 复杂状态机演示 ===');

        enum State {
            IDLE = 'IDLE',
            LOADING = 'LOADING',
            SUCCESS = 'SUCCESS',
            ERROR = 'ERROR'
        }

        const stateSubject = new BehaviorSubject<State>(State.IDLE);
        const eventSubject = new Subject<string>();

        // 状态机逻辑
        const stateMachine = combineLatest([stateSubject, eventSubject]).pipe(
            map(([state, event]) => {
                addOutput(`状态机: ${state} -> ${event}`);

                switch (state) {
                    case State.IDLE:
                        if (event === 'START') return State.LOADING;
                        break;
                    case State.LOADING:
                        if (event === 'SUCCESS') return State.SUCCESS;
                        if (event === 'ERROR') return State.ERROR;
                        break;
                    case State.SUCCESS:
                    case State.ERROR:
                        if (event === 'RESET') return State.IDLE;
                        break;
                }
                return state;
            }),
            distinctUntilChanged()
        );

        const stateSub = stateMachine.subscribe(newState => {
            stateSubject.next(newState);
            addOutput(`状态机新状态: ${newState}`);
        });

        // 模拟状态转换
        const events = ['START', 'SUCCESS', 'RESET', 'START', 'ERROR', 'RESET'];
        events.forEach((event, index) => {
            setTimeout(() => {
                eventSubject.next(event);
            }, index * 1000);
        });

        setSubscriptions(prev => [...prev, stateSub]);
    };

    // 清理函数
    useEffect(() => {
        return () => {
            subscriptions.forEach(sub => sub.unsubscribe());
        };
    });

    return (
        <ScrollView style={[styles.container, {backgroundColor: colors.background}]}>
            <Text style={[styles.title, {color: colors.text}]}>RxJS 高级特性演示</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateAdvancedOperators}
                >
                    <Text style={styles.buttonText}>高级操作符</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateSchedulers}
                >
                    <Text style={styles.buttonText}>调度器</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateMulticast}
                >
                    <Text style={styles.buttonText}>多播共享</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateAdvancedErrorHandling}
                >
                    <Text style={styles.buttonText}>高级错误处理</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateAdvancedBuffering}
                >
                    <Text style={styles.buttonText}>高级缓冲</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateAdvancedCombination}
                >
                    <Text style={styles.buttonText}>高级组合</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateAdvancedFiltering}
                >
                    <Text style={styles.buttonText}>高级过滤</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateCustomOperators}
                >
                    <Text style={styles.buttonText}>自定义操作符</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstratePerformanceOptimization}
                >
                    <Text style={styles.buttonText}>性能优化</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateStateMachine}
                >
                    <Text style={styles.buttonText}>状态机</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#FF3B30'}]}
                    onPress={clearSubscriptions}
                >
                    <Text style={styles.buttonText}>取消订阅</Text>
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

export default RxJSAdvancedDemo;
