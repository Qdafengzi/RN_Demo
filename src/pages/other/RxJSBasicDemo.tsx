import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {useTheme} from '../../theme/ThemeContext';
import {EMPTY, from, interval, Observable, of, range, Subscription, throwError, timer,} from 'rxjs';

const RxJSBasicDemo: React.FC = () => {
    const {colors} = useTheme();
    const [output, setOutput] = useState<string[]>([]);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const scrollViewRef = useRef<ScrollView>(null);

    const addOutput = (text: string) => {
        setOutput(prev => {
            const newOutput = [...prev, `${new Date().toLocaleTimeString()}: ${text}`];
            // 自动滚动到底部
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({animated: true});
            }, 100);
            return newOutput;
        });
    };

    const clearOutput = () => setOutput([]);

    const clearSubscriptions = () => {
        subscriptions.forEach(sub => sub.unsubscribe());
        setSubscriptions([]);
    };

    // 1. 基础 Observable 创建
    const demonstrateBasicObservables = () => {
        addOutput('=== 基础 Observable 创建 ===');

        // 1.1 使用 of 创建同步数据流
        const ofObservable = of(1, 2, 3, 4, 5);
        const ofSub = ofObservable.subscribe({
            next: value => addOutput(`of: ${value}`),
            complete: () => addOutput('of: 完成'),
        });
        setSubscriptions(prev => [...prev, ofSub]);

        // 1.2 使用 from 创建异步数据流
        const fromObservable = from([10, 20, 30, 40, 50]);
        const fromSub = fromObservable.subscribe({
            next: value => addOutput(`from: ${value}`),
            complete: () => addOutput('from: 完成'),
        });
        setSubscriptions(prev => [...prev, fromSub]);

        // 1.3 使用 range 创建数字范围
        const rangeObservable = range(1, 5);
        const rangeSub = rangeObservable.subscribe({
            next: value => addOutput(`range: ${value}`),
            complete: () => addOutput('range: 完成'),
        });
        setSubscriptions(prev => [...prev, rangeSub]);
    };

    // 2. 定时器 Observable
    const demonstrateTimers = () => {
        addOutput('=== 定时器 Observable ===');

        // 2.1 interval - 间隔定时器
        const intervalObservable = interval(1000);
        const intervalSub = intervalObservable.subscribe({
            next: value => {
                addOutput(`interval: ${value}`);
                if (value >= 3) {
                    intervalSub.unsubscribe();
                    addOutput('interval: 已停止');
                }
            },
        });

        // 2.2 timer - 延迟定时器
        const timerObservable = timer(2000, 1000);
        const timerSub = timerObservable.subscribe({
            next: value => {
                addOutput(`timer: ${value}`);
                if (value >= 2) {
                    timerSub.unsubscribe();
                    addOutput('timer: 已停止');
                }
            },
        });
    };

    // 3. 自定义 Observable
    const demonstrateCustomObservable = () => {
        addOutput('=== 自定义 Observable ===');

        const customObservable = new Observable<number>(observer => {
            addOutput('自定义 Observable 开始执行');

            let count = 0;
            const interval = setInterval(() => {
                count++;
                observer.next(count);
                addOutput(`自定义 Observable 发送: ${count}`);

                if (count >= 3) {
                    clearInterval(interval);
                    observer.complete();
                    addOutput('自定义 Observable 完成');
                }
            }, 1000);

            // 清理函数
            return () => {
                clearInterval(interval);
                addOutput('自定义 Observable 清理');
            };
        });

        const customSub = customObservable.subscribe({
            next: value => addOutput(`自定义订阅者收到: ${value}`),
            complete: () => addOutput('自定义订阅完成'),
            error: error => addOutput(`自定义订阅错误: ${error}`),
        });
        setSubscriptions(prev => [...prev, customSub]);
    };

    // 4. 错误处理
    const demonstrateErrorHandling = () => {
        addOutput('=== 错误处理 ===');

        // 4.1 抛出错误
        const errorObservable = throwError(() => new Error('这是一个错误！'));
        const errorSub = errorObservable.subscribe({
            next: value => addOutput(`错误 Observable: ${value}`),
            error: error => addOutput(`捕获错误: ${error.message}`),
            complete: () => addOutput('错误 Observable 完成'),
        });
        setSubscriptions(prev => [...prev, errorSub]);

        // 4.2 空 Observable
        const emptySub = EMPTY.subscribe({
            next: value => addOutput(`空 Observable: ${value}`),
            complete: () => addOutput('空 Observable 立即完成'),
        });
        setSubscriptions(prev => [...prev, emptySub]);
    };

    // 5. 多订阅者
    const demonstrateMultipleSubscribers = () => {
        addOutput('=== 多订阅者演示 ===');

        const sharedObservable = of('共享数据');

        // 第一个订阅者
        const sub1 = sharedObservable.subscribe({
            next: value => addOutput(`订阅者1: ${value}`),
            complete: () => addOutput('订阅者1: 完成'),
        });

        // 第二个订阅者
        const sub2 = sharedObservable.subscribe({
            next: value => addOutput(`订阅者2: ${value}`),
            complete: () => addOutput('订阅者2: 完成'),
        });

        setSubscriptions(prev => [...prev, sub1, sub2]);
    };

    // 6. 订阅管理
    const demonstrateSubscriptionManagement = () => {
        addOutput('=== 订阅管理演示 ===');

        const managedObservable = interval(500);
        const managedSub = managedObservable.subscribe({
            next: value => {
                addOutput(`管理订阅: ${value}`);
                if (value >= 5) {
                    managedSub.unsubscribe();
                    addOutput('管理订阅: 已手动取消');
                }
            },
        });
        setSubscriptions(prev => [...prev, managedSub]);
    };

    // 清理函数
    useEffect(() => {
        return () => {
            subscriptions.forEach(sub => sub.unsubscribe());
        };
    });

    return (
        <ScrollView style={[styles.container, {backgroundColor: colors.background}]}>
            <Text style={[styles.title, {color: colors.text}]}>RxJS 基础概念演示</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateBasicObservables}
                >
                    <Text style={styles.buttonText}>基础 Observable</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateTimers}
                >
                    <Text style={styles.buttonText}>定时器</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateCustomObservable}
                >
                    <Text style={styles.buttonText}>自定义 Observable</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateErrorHandling}
                >
                    <Text style={styles.buttonText}>错误处理</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateMultipleSubscribers}
                >
                    <Text style={styles.buttonText}>多订阅者</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateSubscriptionManagement}
                >
                    <Text style={styles.buttonText}>订阅管理</Text>
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

export default RxJSBasicDemo;
