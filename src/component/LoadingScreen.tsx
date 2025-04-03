import {ActivityIndicator, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import React from 'react';

export const LoadingScreen: React.FC = () => {
    const {colors} = useTheme();
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background}}>
            <ActivityIndicator size="large" color={colors.primary}/>
        </View>
    );
};
