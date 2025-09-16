import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {useTheme} from '../../theme/ThemeContext';
import {AsyncSubject, BehaviorSubject, interval, ReplaySubject, Subject, Subscription, take,} from 'rxjs';

const RxJSSubjectDemo: React.FC = () => {
    const {colors} = useTheme();
    const [output, setOutput] = useState<string[]>([]);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [inputValue, setInputValue] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);

    // Subject 引用
    const subjectRef = useRef<Subject<string> | undefined>(undefined);
    const behaviorSubjectRef = useRef<BehaviorSubject<string> | undefined>(undefined);
    const replaySubjectRef = useRef<ReplaySubject<string> | undefined>(undefined);
    const asyncSubjectRef = useRef<AsyncSubject<string> | undefined>(undefined);

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

    // 1. Subject 基础演示
    const demonstrateBasicSubject = () => {
        addOutput('=== Subject 基础演示 ===');

        // 创建 Subject
        const subject = new Subject<string>();
        subjectRef.current = subject;

        // 第一个订阅者
        const sub1 = subject.subscribe({
            next: value => addOutput(`订阅者1: ${value}`),
            complete: () => addOutput('订阅者1: 完成')
        });

        // 第二个订阅者
        const sub2 = subject.subscribe({
            next: value => addOutput(`订阅者2: ${value}`),
            complete: () => addOutput('订阅者2: 完成')
        });

        setSubscriptions(prev => [...prev, sub1, sub2]);

        // 发送数据
        subject.next('Hello');
        subject.next('World');
        subject.complete();
    };

    // 2. BehaviorSubject 演示
    const demonstrateBehaviorSubject = () => {
        addOutput('=== BehaviorSubject 演示 ===');

        // 创建 BehaviorSubject（有初始值）
        const behaviorSubject = new BehaviorSubject<string>('初始值');
        behaviorSubjectRef.current = behaviorSubject;

        // 订阅者1 - 立即获得当前值
        const sub1 = behaviorSubject.subscribe({
            next: value => addOutput(`Behavior订阅者1: ${value}`),
            complete: () => addOutput('Behavior订阅者1: 完成')
        });

        // 发送新值
        behaviorSubject.next('第一个值');

        // 订阅者2 - 获得最新值
        const sub2 = behaviorSubject.subscribe({
            next: value => addOutput(`Behavior订阅者2: ${value}`),
            complete: () => addOutput('Behavior订阅者2: 完成')
        });

        behaviorSubject.next('第二个值');
        behaviorSubject.complete();

        setSubscriptions(prev => [...prev, sub1, sub2]);
    };

    // 3. ReplaySubject 演示
    const demonstrateReplaySubject = () => {
        addOutput('=== ReplaySubject 演示 ===');

        // 创建 ReplaySubject（重放最后2个值）
        const replaySubject = new ReplaySubject<string>(2);
        replaySubjectRef.current = replaySubject;

        // 发送一些数据
        replaySubject.next('第一个值');
        replaySubject.next('第二个值');
        replaySubject.next('第三个值');

        // 订阅者 - 会收到最后2个值
        const sub = replaySubject.subscribe({
            next: value => addOutput(`Replay订阅者: ${value}`),
            complete: () => addOutput('Replay订阅者: 完成')
        });

        replaySubject.next('第四个值');
        replaySubject.complete();

        setSubscriptions(prev => [...prev, sub]);
    };

    // 4. AsyncSubject 演示
    const demonstrateAsyncSubject = () => {
        addOutput('=== AsyncSubject 演示 ===');

        // 创建 AsyncSubject
        const asyncSubject = new AsyncSubject<string>();
        asyncSubjectRef.current = asyncSubject;

        // 订阅者
        const sub = asyncSubject.subscribe({
            next: value => addOutput(`Async订阅者: ${value}`),
            complete: () => addOutput('Async订阅者: 完成')
        });

        // 发送数据（只有最后一个会被发送）
        asyncSubject.next('第一个值');
        asyncSubject.next('第二个值');
        asyncSubject.next('最后一个值');
        asyncSubject.complete();

        setSubscriptions(prev => [...prev, sub]);
    };

    // 5. Subject 作为 Observable 和 Observer
    const demonstrateSubjectAsBoth = () => {
        addOutput('=== Subject 作为 Observable 和 Observer ===');

        const subject = new Subject<number>();

        // 作为 Observable 被订阅
        const sub1 = subject.subscribe(value => addOutput(`作为Observable: ${value}`));

        // 作为 Observer 订阅其他 Observable
        const sub2 = interval(1000).pipe(
            take(3)
        ).subscribe({
            next: (value) => subject.next(value),
            error: (error) => subject.error(error),
            complete: () => subject.complete()
        });

        setSubscriptions(prev => [...prev, sub1, sub2]);
    };

    // 6. 多播演示
    const demonstrateMulticast = () => {
        addOutput('=== 多播演示 ===');

        const subject = new Subject<number>();

        // 多个订阅者
        const sub1 = subject.subscribe(value => addOutput(`多播订阅者1: ${value}`));
        const sub2 = subject.subscribe(value => addOutput(`多播订阅者2: ${value}`));
        const sub3 = subject.subscribe(value => addOutput(`多播订阅者3: ${value}`));

        // 发送数据，所有订阅者都会收到
        subject.next(1);
        subject.next(2);
        subject.next(3);
        subject.complete();

        setSubscriptions(prev => [...prev, sub1, sub2, sub3]);
    };

    // 7. 状态管理演示
    const demonstrateStateManagement = () => {
        addOutput('=== 状态管理演示 ===');

        interface AppState {
            count: number;
            user: string;
            loading: boolean;
        }

        const initialState: AppState = {
            count: 0,
            user: '未登录',
            loading: false
        };

        const stateSubject = new BehaviorSubject<AppState>(initialState);

        // 状态订阅者
        const stateSub = stateSubject.subscribe(state => {
            addOutput(`状态更新: count=${state.count}, user=${state.user}, loading=${state.loading}`);
        });

        // 模拟状态更新
        stateSubject.next({...initialState, count: 1, user: '张三'});
        stateSubject.next({...initialState, count: 2, user: '张三', loading: true});
        stateSubject.next({...initialState, count: 3, user: '张三', loading: false});

        setSubscriptions(prev => [...prev, stateSub]);
    };

    // 8. 事件总线演示
    const demonstrateEventBus = () => {
        addOutput('=== 事件总线演示 ===');

        interface Event {
            type: string;
            payload: any;
        }

        const eventBus = new Subject<Event>();

        // 事件处理器
        const eventSub1 = eventBus.subscribe(event => {
            if (event.type === 'USER_LOGIN') {
                addOutput(`用户登录事件: ${event.payload.username}`);
            }
        });

        const eventSub2 = eventBus.subscribe(event => {
            if (event.type === 'DATA_LOADED') {
                addOutput(`数据加载事件: ${event.payload.count} 条记录`);
            }
        });

        const eventSub3 = eventBus.subscribe(event => {
            addOutput(`所有事件: ${event.type} - ${JSON.stringify(event.payload)}`);
        });

        // 发送事件
        eventBus.next({type: 'USER_LOGIN', payload: {username: '张三'}});
        eventBus.next({type: 'DATA_LOADED', payload: {count: 100}});
        eventBus.next({type: 'ERROR', payload: {message: '网络错误'}});

        setSubscriptions(prev => [...prev, eventSub1, eventSub2, eventSub3]);
    };

    // 9. 自定义输入处理
    const handleCustomInput = () => {
        if (!inputValue.trim()) return;

        addOutput(`=== 自定义输入: ${inputValue} ===`);

        if (subjectRef.current) {
            subjectRef.current.next(inputValue);
        }

        setInputValue('');
    };

    // 10. 清理所有 Subject
    const cleanupSubjects = () => {
        addOutput('=== 清理所有 Subject ===');

        if (subjectRef.current) {
            subjectRef.current.complete();
            subjectRef.current = undefined;
        }

        if (behaviorSubjectRef.current) {
            behaviorSubjectRef.current.complete();
            behaviorSubjectRef.current = undefined;
        }

        if (replaySubjectRef.current) {
            replaySubjectRef.current.complete();
            replaySubjectRef.current = undefined;
        }

        if (asyncSubjectRef.current) {
            asyncSubjectRef.current.complete();
            asyncSubjectRef.current = undefined;
        }

        addOutput('所有 Subject 已清理');
    };

    // 清理函数
    useEffect(() => {
        return () => {
            subscriptions.forEach(sub => sub.unsubscribe());
            cleanupSubjects();
        };
    });

    return (
        <ScrollView style={[styles.container, {backgroundColor: colors.background}]}>
            <Text style={[styles.title, {color: colors.text}]}>RxJS Subject 演示</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateBasicSubject}
                >
                    <Text style={styles.buttonText}>Subject 基础</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateBehaviorSubject}
                >
                    <Text style={styles.buttonText}>BehaviorSubject</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateReplaySubject}
                >
                    <Text style={styles.buttonText}>ReplaySubject</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateAsyncSubject}
                >
                    <Text style={styles.buttonText}>AsyncSubject</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateSubjectAsBoth}
                >
                    <Text style={styles.buttonText}>双重身份</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateMulticast}
                >
                    <Text style={styles.buttonText}>多播</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateStateManagement}
                >
                    <Text style={styles.buttonText}>状态管理</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateEventBus}
                >
                    <Text style={styles.buttonText}>事件总线</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#FF3B30'}]}
                    onPress={clearSubscriptions}
                >
                    <Text style={styles.buttonText}>取消订阅</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#FF9500'}]}
                    onPress={cleanupSubjects}
                >
                    <Text style={styles.buttonText}>清理 Subject</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#8E8E93'}]}
                    onPress={clearOutput}
                >
                    <Text style={styles.buttonText}>清空输出</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.inputContainer, {backgroundColor: colors.card, borderColor: colors.border}]}>
                <Text style={[styles.inputLabel, {color: colors.text}]}>自定义输入测试:</Text>
                <View style={styles.inputRow}>
                    <TextInput
                        style={[styles.textInput, {
                            backgroundColor: colors.background,
                            color: colors.text,
                            borderColor: colors.border
                        }]}
                        value={inputValue}
                        onChangeText={setInputValue}
                        placeholder="输入测试数据"
                        placeholderTextColor={colors.text + '80'}
                    />
                    <TouchableOpacity
                        style={[styles.inputButton, {backgroundColor: colors.primary}]}
                        onPress={handleCustomInput}
                    >
                        <Text style={styles.buttonText}>发送</Text>
                    </TouchableOpacity>
                </View>
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
    inputContainer: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    inputButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
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

export default RxJSSubjectDemo;
