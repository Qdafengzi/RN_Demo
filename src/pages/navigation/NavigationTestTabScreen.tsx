import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeColors} from '../../theme/colors';
import {useTheme} from '../../theme/ThemeContext';

type ActionCardProps = {
    title: string;
    description: string;
    colors: ThemeColors;
    onPress: () => void;
};

const ActionCard: React.FC<ActionCardProps> = ({title, description, colors, onPress}) => (
    <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.actionCard, {backgroundColor: colors.card, borderColor: colors.border}]}
        onPress={onPress}
    >
        <Text style={[styles.actionTitle, {color: colors.text}]}>{title}</Text>
        <Text style={[styles.actionDescription, {color: colors.text}]}>{description}</Text>
    </TouchableOpacity>
);

export const NavigationTestTabScreen: React.FC<{navigation: any}> = ({navigation}) => {
    const {colors} = useTheme();

    return (
        <ScrollView
            style={[styles.container, {backgroundColor: colors.background}]}
            contentContainerStyle={styles.content}
        >
            <Text style={[styles.title, {color: colors.text}]}>导航测试页</Text>
            <Text style={[styles.subtitle, {color: colors.text}]}>
                这个页面只用来测试 tab 切换、根 stack 跳转、modal 打开和返回流程。
            </Text>

            <View style={[styles.summaryCard, {backgroundColor: colors.card, borderColor: colors.border}]}>
                <Text style={[styles.summaryLabel, {color: colors.text}]}>当前入口</Text>
                <Text style={[styles.summaryValue, {color: colors.primary}]}>导航测试 Tab</Text>
            </View>

            <ActionCard
                title="打开根详情页"
                description="从当前 tab 页面直接跳到根 Stack 的详情页"
                colors={colors}
                onPress={() =>
                    navigation.getParent()?.navigate('NavigationTestDetail', {
                        source: '导航测试 Tab',
                        level: 1,
                    })
                }
            />
            <ActionCard
                title="打开测试 Modal"
                description="验证 tab 页面能否直接打开根层 modal"
                colors={colors}
                onPress={() =>
                    navigation.getParent()?.navigate('NavigationTestModal', {
                        source: '导航测试 Tab',
                    })
                }
            />
            <ActionCard
                title="切到首页 Tab"
                description="测试从测试页切回首页 tab 的行为"
                colors={colors}
                onPress={() => navigation.jumpTo('首页')}
            />
            <ActionCard
                title="切到原生 Tab"
                description="测试从测试页切到原生 tab 的行为"
                colors={colors}
                onPress={() => navigation.jumpTo('原生')}
            />
            <ActionCard
                title="切到其他 Tab"
                description="测试从测试页切到其他 tab 的行为"
                colors={colors}
                onPress={() => navigation.jumpTo('其他')}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
        gap: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 21,
        opacity: 0.8,
    },
    summaryCard: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
    },
    summaryLabel: {
        fontSize: 13,
        opacity: 0.7,
        marginBottom: 6,
    },
    summaryValue: {
        fontSize: 18,
        fontWeight: '700',
    },
    actionCard: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        gap: 6,
    },
    actionTitle: {
        fontSize: 17,
        fontWeight: '700',
    },
    actionDescription: {
        fontSize: 13,
        lineHeight: 20,
        opacity: 0.75,
    },
});
