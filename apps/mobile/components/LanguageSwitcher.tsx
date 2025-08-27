import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Typography } from './ui/Typography';
import { useLocale, useTranslation } from '@/contexts/LocaleContext';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const { t } = useTranslation();

  return (
    <View className="flex-row items-center space-x-2 p-4">
      <Typography font="poppins" weight="medium" size="base" className="mr-2">
        Language:
      </Typography>
      
      <TouchableOpacity
        onPress={() => setLocale('en')}
        className={`px-3 py-2 rounded-lg ${locale === 'en' ? 'bg-blue-500' : 'bg-gray-200'}`}
      >
        <Typography
          font="poppins"
          weight="semibold"
          size="sm"
          color={locale === 'en' ? 'white' : 'black'}
        >
          {t('navigation.english')}
        </Typography>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => setLocale('ar')}
        className={`px-3 py-2 rounded-lg ${locale === 'ar' ? 'bg-blue-500' : 'bg-gray-200'}`}
      >
        <Typography
          font="noto-kufi"
          weight="semibold"
          size="sm"
          color={locale === 'ar' ? 'white' : 'black'}
        >
          {t('navigation.arabic')}
        </Typography>
      </TouchableOpacity>
    </View>
  );
}