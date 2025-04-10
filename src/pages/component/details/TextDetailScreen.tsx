import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../../theme/ThemeContext';
import React from 'react';
import {useTranslation} from 'react-i18next';
// import i18n from "i18next";
import i18n from '../../../i18n/language.ts';

export const TextDetailScreen: React.FC = () => {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View
      style={[styles.detailContainer, {backgroundColor: colors.background}]}>
      <Text
        style={{
          color: colors.text,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        {t('common.hello')}
      </Text>
      <Text style={{
         color: colors.text,
      }}>{t('common.welcome')}</Text>
      <Text style={{
         color: colors.text,
      }}>{t('common.buttons.login')}</Text>
      <Text
        style={{
          color: colors.text,
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
        文本组件详情
      </Text>
      <Text style={{color: colors.text, fontSize: 16, marginBottom: 10}}>
        普通文本
      </Text>
      <Text
        style={{
          color: colors.text,
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 10,
        }}>
        粗体文本
      </Text>
      <Text
        style={{
          color: colors.text,
          fontSize: 16,
          fontStyle: 'italic',
          marginBottom: 10,
        }}>
        斜体文本
      </Text>
      <Text
        style={{
          color: colors.text,
          fontSize: 16,
          textDecorationLine: 'underline',
          marginBottom: 10,
        }}>
        下划线文本
      </Text>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
        }}>
        <TouchableOpacity
          style={[
            styles.button,
            i18n.language === 'en' ? styles.activeButton : null,
          ]}
          onPress={() => {
              i18n.changeLanguage('en');
          }}>
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            i18n.language === 'zh' ? styles.activeButton : null,
          ]}
          onPress={() =>{
              i18n.changeLanguage('zh');
          }}>
          <Text style={styles.buttonText}>中文</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  detailContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    width: '50%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
});
