import {Pressable, Text, View} from 'react-native';
import {create} from 'zustand/react';
import {useShallow} from 'zustand/react/shallow';
import {createThemedStyles, useTheme} from '../../theme/ThemeContext.tsx';

/**
 * 浅比较
 * 1.不要对基础类型使用useShallow 没有意义
 * 2.
 *
 * useShallow 是一个性能优化工具，帮助您避免因对象或数组引用变化导致的不必要重新渲染。
 */

// 定义包含复杂对象的状态
interface UserState {
    user: {
        profile: {
            name: string;
            age: number;
            settings: {
                theme: string;
                notifications: boolean[];
            };
        };
    };
    posts: { id: number; title: string }[];
    count: number;
    updateUser: (name: string) => void;
    updateAge: (age: number) => void;
    addPost: (post: { id: number; title: string }) => void;
}

const useUserStore = create<UserState>((set) => ({
    user: {
        profile: {
            name: 'Lili',
            age: 0,
            settings: {
                theme: 'light',
                notifications: [],
            },
        },
    },
    posts: [],
    count: 0,
    updateUser: (name) => set((state) => ({
        user: {
            ...state.user,
            profile: {
                ...state.user.profile,
                name,
            },
        },
    })),
    updateAge: (age) => set((state) => ({
        user: {
            ...state.user,
            profile: {
                ...state.user.profile,
                age,
            },
        },
    })),
    addPost: (post) => set((state) => ({
        posts: [...state.posts, post],
    })),
}));

export function UseShallowDemo() {
    useTheme();
    const styles = useStyles();

    // ❌ 不要对基本类型使用 useShallow（没有意义）
    //const count = useUserStore(useShallow((state) => state.count));
    // ✅ 对基本类型直接使用即可
    //const count = useUserStore((state) => state.count);

    // ✅ 对复杂类型使用 useShallow
    //const user = useUserStore(useShallow((state) => state.user));
    //const posts = useUserStore(useShallow((state) => state.posts));

    // 不使用 useShallow 的情况
    const ComponentWithoutShallow = () => {
        // ❌ 即使只有 name 变化，也会重新渲染整个组件
        // 因为每次返回的都是新对象
        const user = useUserStore((state) => state.user.profile);
        const updateUser = useUserStore((state) => state.updateUser);

        return (
            <View style={{width: '100%', height: 300, backgroundColor: "#855755"}}>
                <Text>{user.name} - {user.age}</Text>

                <Pressable style={styles.button} onPress={() => {
                    updateUser("Tom");
                }}>
                    <Text>改变姓名</Text>
                </Pressable>

            </View>
        );
    };

    // 比较多个状态
    const ComponentWithMultipleStates = () => {
        // ✅ 浅比较多个状态，只有当实际值变化时才重新渲染
        const {name, theme} = useUserStore(
            useShallow((state) => ({
                name: state.user.profile.name,
                theme: state.user.profile.settings.theme,
            }))
        );

        const updateUser = useUserStore((state) => state.updateUser);
        const updateAge = useUserStore((state) => state.updateAge);

        return (
            <View style={{width: '100%', height: 300, backgroundColor: "#855755"}}>
                <Text>{name} - {theme}</Text>

                <Pressable style={styles.button} onPress={() => {
                    updateUser("Tom");
                }}>
                    <Text>改变姓名(会刷新UI)</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => {
                    updateAge(99);
                }}>
                    <Text>改变年龄(不会刷新UI)</Text>
                </Pressable>
            </View>
        );
    };

    // 比较数组
    const ComponentWithArray = () => {
        // ✅ 浅比较数组，只有当数组内容变化时才重新渲染
        const posts = useUserStore(
            useShallow((state) => state.posts)
        );
        const addPost = useUserStore((state) => state.addPost);

        return (
            <View>
                {posts.map(post => (
                    <View>
                        <Text>{post.id}--{post.title}</Text>
                    </View>
                ))}
                <Pressable style={styles.button} onPress={() => {
                    addPost({id: 457, title: "title1"});
                }}>
                    <Text>添加数组(刷新UI)</Text>
                </Pressable>
            </View>
        );
    };

    return (
        <View>
            <ComponentWithoutShallow/>
            <ComponentWithMultipleStates/>
            <ComponentWithArray/>

        </View>
    );
}


const useStyles = createThemedStyles((_) => ({
    button: {
        width: '100%',
        height: 50,
        marginTop: 20,
        backgroundColor: '#167520',
        padding: 10,
        borderRadius: 5,
    },
}));
