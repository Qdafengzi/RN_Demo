import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeColors} from '../../theme/colors';
import {useTheme} from '../../theme/ThemeContext';

type ModalActionProps = {
    title: string;
    description: string;
    colors: ThemeColors;
    onPress: () => void;
};

const ModalAction: React.FC<ModalActionProps> = ({title, description, colors, onPress}) => (
    <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.action, {backgroundColor: colors.card, borderColor: colors.border}]}
        onPress={onPress}
    >
        <Text style={[styles.actionTitle, {color: colors.text}]}>{title}</Text>
        <Text style={[styles.actionDescription, {color: colors.text}]}>{description}</Text>
    </TouchableOpacity>
);

export const NavigationTestModalScreen: React.FC<{navigation: any; route: any}> = ({
    navigation,
    route,
}) => {
    const {colors} = useTheme();
    const source = route.params?.source ?? '未知入口';

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <Text style={[styles.title, {color: colors.text}]}>导航测试 Modal</Text>
            <Text style={[styles.subtitle, {color: colors.text}]}>
                当前来源：{source}
            </Text>

            <View style={styles.actionList}>
                <ModalAction
                    title="关闭 Modal"
                    description="直接返回上一层页面"
                    colors={colors}
                    onPress={() => navigation.goBack()}
                />
                <ModalAction
                    title="跳到详情页"
                    description="从 modal 再 push 一个根详情页"
                    colors={colors}
                    onPress={() =>
                        navigation.push('NavigationTestDetail', {
                            source: 'NavigationTestModal',
                            level: 1,
                        })
                    }
                />
                <ModalAction
                    title="回到测试 Tab"
                    description="关闭当前流程，回到导航测试 tab"
                    colors={colors}
                    onPress={() =>
                        navigation.navigate('MainTabScreen', {
                            screen: '导航测试',
                        })
                    }
                />
                <ModalAction
                    title="切到原生 Tab"
                    description="验证从 modal 返回后再切 tab 的行为"
                    colors={colors}
                    onPress={() =>
                        navigation.navigate('MainTabScreen', {
                            screen: '原生',
                        })
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 21,
        opacity: 0.8,
    },
    actionList: {
        marginTop: 20,
        gap: 12,
    },
    action: {
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
