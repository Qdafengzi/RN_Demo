import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {useTheme} from '../../theme/ThemeContext';
import {
    BehaviorSubject,
    buffer,
    catchError,
    combineLatest,
    debounceTime,
    delay,
    distinctUntilChanged,
    filter,
    finalize,
    interval,
    map,
    merge,
    of,
    retry,
    shareReplay,
    Subject,
    Subscription,
    switchMap,
    take,
    takeUntil,
    timer,
} from 'rxjs';

const RxJSRealWorldDemo: React.FC = () => {
    const {colors} = useTheme();
    const [output, setOutput] = useState<string[]>([]);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userCount, setUserCount] = useState(0);
    const [notifications, setNotifications] = useState<string[]>([]);
    const scrollViewRef = useRef<ScrollView>(null);

    // 全局状态管理
    const appStateSubject = useRef(new BehaviorSubject({
        user: null as any,
        theme: 'light',
        notifications: [] as string[],
        loading: false
    }));

    // 事件总线
    const eventBus = useRef(new Subject<any>());

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

    // 1. 搜索功能演示
    const demonstrateSearch = () => {
        addOutput('=== 搜索功能演示 ===');

        // 模拟搜索 API
        const searchAPI = (query: string) => {
            return of(`搜索结果: ${query}`).pipe(
                delay(Math.random() * 1000 + 500) // 模拟网络延迟
            );
        };

        // 创建搜索流
        const searchSubject = new Subject<string>();

        const searchSub = searchSubject.pipe(
            debounceTime(300), // 防抖
            distinctUntilChanged(), // 去重
            filter(query => query.length > 0), // 过滤空查询
            switchMap(query => {
                addOutput(`搜索: ${query}`);
                return searchAPI(query).pipe(
                    catchError(error => {
                        addOutput(`搜索错误: ${error.message}`);
                        return of('搜索失败');
                    })
                );
            })
        ).subscribe(result => {
            addOutput(`搜索结果: ${result}`);
        });

        setSubscriptions(prev => [...prev, searchSub]);

        // 模拟用户输入
        const queries = ['react', 'rxjs', 'typescript', 'javascript'];
        queries.forEach((query, index) => {
            setTimeout(() => {
                searchSubject.next(query);
            }, index * 200);
        });

        // 5秒后完成搜索
        setTimeout(() => {
            searchSubject.complete();
            addOutput('搜索演示完成');
        }, 5000);
    };

    // 2. 实时数据流演示
    const demonstrateRealTimeData = () => {
        addOutput('=== 实时数据流演示 ===');

        // 模拟实时数据源
        const dataStream = interval(1000).pipe(
            map(() => ({
                id: Math.random().toString(36).substr(2, 9),
                value: Math.floor(Math.random() * 100),
                timestamp: new Date().toISOString()
            })),
            take(10) // 只取10个数据点
        );

        const dataSub = dataStream.subscribe(data => {
            addOutput(`实时数据: ID=${data.id}, 值=${data.value}, 时间=${data.timestamp}`);
        });

        setSubscriptions(prev => [...prev, dataSub]);
    };

    // 3. 状态管理演示
    const demonstrateStateManagement = () => {
        addOutput('=== 状态管理演示 ===');

        // 状态订阅
        const stateSub = appStateSubject.current.subscribe(state => {
            addOutput(`状态更新: 用户=${state.user?.name || '未登录'}, 主题=${state.theme}, 通知数=${state.notifications.length}`);
        });

        // 模拟状态变化
        const stateChanges = [
            {user: {name: '张三', id: 1}, theme: 'light'},
            {user: {name: '张三', id: 1}, theme: 'dark'},
            {user: {name: '李四', id: 2}, theme: 'dark'},
            {user: null, theme: 'light'}
        ];

        stateChanges.forEach((change, index) => {
            setTimeout(() => {
                appStateSubject.current.next({
                    ...appStateSubject.current.value,
                    ...change
                });
            }, index * 1000);
        });

        setSubscriptions(prev => [...prev, stateSub]);
    };

    // 4. 网络请求管理
    const demonstrateNetworkRequests = () => {
        addOutput('=== 网络请求管理演示 ===');

        // 模拟 API 请求
        const apiRequest = (endpoint: string) => {
            return of(`API响应: ${endpoint}`).pipe(
                delay(Math.random() * 2000 + 1000), // 模拟网络延迟
                map(response => ({endpoint, response, timestamp: Date.now()})),
                catchError(error => {
                    addOutput(`API错误: ${endpoint} - ${error.message}`);
                    return of({endpoint, error: error.message, timestamp: Date.now()});
                })
            );
        };

        // 并发请求
        const requests = [
            apiRequest('/users'),
            apiRequest('/posts'),
            apiRequest('/comments')
        ];

        const requestsSub = combineLatest(requests).subscribe((results: any[]) => {
            addOutput(`所有请求完成: ${results.length} 个结果`);
            results.forEach(result => {
                if ('error' in result) {
                    addOutput(`请求失败: ${result.endpoint} - ${result.error}`);
                } else {
                    addOutput(`请求成功: ${result.endpoint} - ${result.response}`);
                }
            });
        });

        setSubscriptions(prev => [...prev, requestsSub]);
    };

    // 5. 事件总线演示
    const demonstrateEventBus = () => {
        addOutput('=== 事件总线演示 ===');

        // 事件处理器
        const loginHandler = eventBus.current.pipe(
            filter(event => event.type === 'USER_LOGIN')
        ).subscribe(event => {
            addOutput(`用户登录: ${event.payload.username}`);
            setUserCount(prev => prev + 1);
        });

        const logoutHandler = eventBus.current.pipe(
            filter(event => event.type === 'USER_LOGOUT')
        ).subscribe(event => {
            addOutput(`用户登出: ${event.payload.username}`);
            setUserCount(prev => Math.max(0, prev - 1));
        });

        const notificationHandler = eventBus.current.pipe(
            filter(event => event.type === 'NOTIFICATION')
        ).subscribe(event => {
            addOutput(`通知: ${event.payload.message}`);
            setNotifications(prev => [...prev, event.payload.message]);
        });

        // 发送事件
        const events = [
            {type: 'USER_LOGIN', payload: {username: '张三'}},
            {type: 'USER_LOGIN', payload: {username: '李四'}},
            {type: 'NOTIFICATION', payload: {message: '欢迎使用应用！'}},
            {type: 'USER_LOGOUT', payload: {username: '张三'}},
            {type: 'NOTIFICATION', payload: {message: '系统维护通知'}}
        ];

        events.forEach((event, index) => {
            setTimeout(() => {
                eventBus.current.next(event);
            }, index * 1000);
        });

        setSubscriptions(prev => [...prev, loginHandler, logoutHandler, notificationHandler]);
    };

    // 6. 缓存和共享演示
    const demonstrateCaching = () => {
        addOutput('=== 缓存和共享演示 ===');

        // 创建可共享的数据流
        const sharedDataStream = interval(2000).pipe(
            map(() => `数据-${Date.now()}`),
            shareReplay(1) // 缓存最后一个值
        );

        // 第一个订阅者
        const sub1 = sharedDataStream.subscribe(data => {
            addOutput(`订阅者1: ${data}`);
        });

        // 延迟订阅者（会立即收到缓存的值）
        setTimeout(() => {
            const sub2 = sharedDataStream.subscribe(data => {
                addOutput(`订阅者2(延迟): ${data}`);
            });
            setSubscriptions(prev => [...prev, sub2]);
        }, 3000);

        setSubscriptions(prev => [...prev, sub1]);
    };

    // 7. 错误处理和重试
    const demonstrateErrorHandling = () => {
        addOutput('=== 错误处理和重试演示 ===');

        let attemptCount = 0;
        const flakyAPI = () => {
            attemptCount++;
            addOutput(`API尝试 ${attemptCount}`);

            if (attemptCount < 3) {
                return timer(1000).pipe(
                    switchMap(() => {
                        throw new Error('网络错误');
                    })
                );
            }

            return of('API成功响应');
        };

        const errorSub = of(null).pipe(
            switchMap(() => flakyAPI()),
            retry(2), // 重试2次
            catchError(error => {
                addOutput(`最终失败: ${error.message}`);
                return of('使用缓存数据');
            }),
            finalize(() => {
                addOutput('请求流程结束');
            })
        ).subscribe(result => {
            addOutput(`结果: ${result}`);
        });

        setSubscriptions(prev => [...prev, errorSub]);
    };

    // 8. 用户交互演示
    const demonstrateUserInteraction = () => {
        addOutput('=== 用户交互演示 ===');

        // 模拟用户点击流
        const clickStream = interval(500).pipe(
            take(10),
            map(() => ({x: Math.random() * 100, y: Math.random() * 100}))
        );

        // 双击检测
        const doubleClickStream = clickStream.pipe(
            buffer(clickStream.pipe(debounceTime(300))),
            filter((clicks: any[]) => clicks.length === 2),
            map((clicks: any[]) => ({type: 'doubleClick', clicks}))
        );

        // 长按检测
        const longPressStream = clickStream.pipe(
            switchMap(click =>
                timer(1000).pipe(
                    map(() => ({type: 'longPress', click})),
                    takeUntil(clickStream) // 如果有点击就取消
                )
            )
        );

        const interactionSub = merge(doubleClickStream, longPressStream).subscribe(interaction => {
            addOutput(`用户交互: ${interaction.type} - ${JSON.stringify(interaction)}`);
        });

        setSubscriptions(prev => [...prev, interactionSub]);
    };

    // 9. 自定义搜索功能
    const handleSearch = () => {
        if (!searchText.trim()) return;

        addOutput(`=== 自定义搜索: ${searchText} ===`);

        setIsLoading(true);

        // 模拟搜索
        const searchSub = of(searchText).pipe(
            delay(1000),
            map(query => `搜索结果: ${query}`)
        ).subscribe(result => {
            addOutput(result);
            setIsLoading(false);
        });

        setSubscriptions(prev => [...prev, searchSub]);
    };

    // 10. 清理所有资源
    const cleanupAll = () => {
        addOutput('=== 清理所有资源 ===');
        clearSubscriptions();
        appStateSubject.current.complete();
        eventBus.current.complete();
        addOutput('所有资源已清理');
    };

    // 清理函数
    useEffect(() => {
        return () => {
            subscriptions.forEach(sub => sub.unsubscribe());
            cleanupAll();
        };
    });

    return (
        <ScrollView style={[styles.container, {backgroundColor: colors.background}]}>
            <Text style={[styles.title, {color: colors.text}]}>RxJS 实际应用演示</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateSearch}
                >
                    <Text style={styles.buttonText}>搜索功能</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateRealTimeData}
                >
                    <Text style={styles.buttonText}>实时数据</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateStateManagement}
                >
                    <Text style={styles.buttonText}>状态管理</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateNetworkRequests}
                >
                    <Text style={styles.buttonText}>网络请求</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateEventBus}
                >
                    <Text style={styles.buttonText}>事件总线</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateCaching}
                >
                    <Text style={styles.buttonText}>缓存共享</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateErrorHandling}
                >
                    <Text style={styles.buttonText}>错误处理</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: colors.primary}]}
                    onPress={demonstrateUserInteraction}
                >
                    <Text style={styles.buttonText}>用户交互</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#FF3B30'}]}
                    onPress={cleanupAll}
                >
                    <Text style={styles.buttonText}>清理资源</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: '#8E8E93'}]}
                    onPress={clearOutput}
                >
                    <Text style={styles.buttonText}>清空输出</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.searchContainer, {backgroundColor: colors.card, borderColor: colors.border}]}>
                <Text style={[styles.searchLabel, {color: colors.text}]}>自定义搜索:</Text>
                <View style={styles.searchRow}>
                    <TextInput
                        style={[styles.searchInput, {
                            backgroundColor: colors.background,
                            color: colors.text,
                            borderColor: colors.border
                        }]}
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder="输入搜索关键词"
                        placeholderTextColor={colors.text + '80'}
                    />
                    <TouchableOpacity
                        style={[styles.searchButton, {backgroundColor: colors.primary}]}
                        onPress={handleSearch}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="white" size="small"/>
                        ) : (
                            <Text style={styles.buttonText}>搜索</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.statsContainer, {backgroundColor: colors.card, borderColor: colors.border}]}>
                <Text style={[styles.statsTitle, {color: colors.text}]}>实时统计:</Text>
                <Text style={[styles.statsText, {color: colors.text}]}>在线用户: {userCount}</Text>
                <Text style={[styles.statsText, {color: colors.text}]}>通知数量: {notifications.length}</Text>
                {notifications.length > 0 && (
                    <View style={styles.notificationsContainer}>
                        <Text style={[styles.notificationsTitle, {color: colors.text}]}>最新通知:</Text>
                        {notifications.slice(-3).map((notification, index) => (
                            <Text key={index} style={[styles.notificationText, {color: colors.text}]}>
                                • {notification}
                            </Text>
                        ))}
                    </View>
                )}
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
    searchContainer: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 20,
    },
    searchLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    searchButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
        minWidth: 60,
        alignItems: 'center',
    },
    statsContainer: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 20,
    },
    statsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    statsText: {
        fontSize: 14,
        marginBottom: 4,
    },
    notificationsContainer: {
        marginTop: 8,
    },
    notificationsTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    notificationText: {
        fontSize: 12,
        marginBottom: 2,
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

export default RxJSRealWorldDemo;
