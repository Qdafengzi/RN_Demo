import {ActivityIndicator, View} from 'react-native';
import {useTheme} from '../theme/ThemeContext';

export const LoadingScreen = () => {
    const {colors} = useTheme();
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background}}>
            <ActivityIndicator size="large" color={colors.primary}/>
        </View>
    );
};
