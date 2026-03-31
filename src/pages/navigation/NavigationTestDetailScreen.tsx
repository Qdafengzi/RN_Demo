import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeColors} from '../../theme/colors';
import {useTheme} from '../../theme/ThemeContext';

type ActionButtonProps = {
    title: string;
    description: string;
    colors: ThemeColors;
    onPress: () => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({title, description, colors, onPress}) => (
    <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.button, {backgroundColor: colors.card, borderColor: colors.border}]}
        onPress={onPress}
    >
        <Text style={[styles.buttonTitle, {color: colors.text}]}>{title}</Text>
        <Text style={[styles.buttonDescription, {color: colors.text}]}>{description}</Text>
    </TouchableOpacity>
);

export const NavigationTestDetailScreen: React.FC<{navigation: any; route: any}> = ({
    navigation,
    route,
}) => {
    const {colors} = useTheme();
    const level = Number(route.params?.level ?? 1);
    const source = route.params?.source ?? '未知入口';

    return (
        <ScrollView
            style={[styles.container, {backgroundColor: colors.background}]}
            contentContainerStyle={styles.content}
        >
            <Text style={[styles.title, {color: colors.text}]}>导航测试详情 {level}</Text>
            <Text style={[styles.subtitle, {color: colors.text}]}>
                这里用来测试 push、goBack、回主 tab 和从详情页继续开 modal。
            </Text>

            <View style={[styles.infoCard, {backgroundColor: colors.card, borderColor: colors.border}]}>
                <Text style={[styles.infoLabel, {color: colors.text}]}>来源</Text>
                <Text style={[styles.infoValue, {color: colors.primary}]}>{source}</Text>
                <Text style={[styles.infoLabel, {color: colors.text}]}>层级</Text>
                <Text style={[styles.infoValue, {color: colors.primary}]}>第 {level} 层</Text>
            </View>

            <ActionButton
                title="再 push 一个详情页"
                description="在根 Stack 上继续压入一层新的详情页"
                colors={colors}
                onPress={() =>
                    navigation.push('NavigationTestDetail', {
                        source: `详情页 ${level}`,
                        level: level + 1,
                    })
                }
            />
            <ActionButton
                title="打开测试 Modal"
                description="从详情页继续打开 modal，看导航栈是否正常"
                colors={colors}
                onPress={() =>
                    navigation.navigate('NavigationTestModal', {
                        source: `详情页 ${level}`,
                    })
                }
            />
            <ActionButton
                title="回到测试 Tab"
                description="返回 MainTabScreen，并定位到导航测试 tab"
                colors={colors}
                onPress={() =>
                    navigation.navigate('MainTabScreen', {
                        screen: '导航测试',
                    })
                }
            />
            <ActionButton
                title="切到首页 Tab"
                description="从根详情页直接切回首页 tab"
                colors={colors}
                onPress={() =>
                    navigation.navigate('MainTabScreen', {
                        screen: '首页',
                    })
                }
            />
            <ActionButton
                title="返回上一页"
                description="验证根 Stack 的 goBack 是否正常"
                colors={colors}
                onPress={() =>
                    navigation.canGoBack()
                        ? navigation.goBack()
                        : navigation.navigate('MainTabScreen', {screen: '导航测试'})
                }
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
    infoCard: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        gap: 6,
    },
    infoLabel: {
        fontSize: 13,
        opacity: 0.7,
    },
    infoValue: {
        fontSize: 18,
        fontWeight: '700',
    },
    button: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        gap: 6,
    },
    buttonTitle: {
        fontSize: 17,
        fontWeight: '700',
    },
    buttonDescription: {
        fontSize: 13,
        lineHeight: 20,
        opacity: 0.75,
    },
});
