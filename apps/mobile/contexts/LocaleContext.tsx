import React, { type ReactNode } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation as useI18nextTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import shared translation files from translations package
import { en as enMessages, ar as arMessages } from '@aqaryo/translations';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3', // For React Native compatibility
    resources: {
      en: { translation: enMessages },
      ar: { translation: arMessages },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: false, // Avoid suspense issues in React Native
    },
  });

// Load saved language on app start
AsyncStorage.getItem('aqaryo-locale').then((savedLocale) => {
  if (savedLocale && (savedLocale === 'en' || savedLocale === 'ar')) {
    i18n.changeLanguage(savedLocale);
  }
});

// Save language when it changes
i18n.on('languageChanged', (lng) => {
  AsyncStorage.setItem('aqaryo-locale', lng);
});

interface LocaleProviderProps {
  children: ReactNode;
}

// Simple provider that doesn't need to do much since i18next handles state
export function LocaleProvider({ children }: LocaleProviderProps) {
  return <>{children}</>;
}

// Enhanced hooks that work with our font system
export function useLocale() {
  const { i18n } = useI18nextTranslation();
  
  return {
    locale: i18n.language as 'en' | 'ar',
    setLocale: (locale: 'en' | 'ar') => i18n.changeLanguage(locale),
    isRTL: i18n.language === 'ar',
  };
}

export function useTranslation() {
  const { t, i18n } = useI18nextTranslation();
  
  return {
    t,
    locale: i18n.language as 'en' | 'ar',
    changeLanguage: i18n.changeLanguage,
    isRTL: i18n.language === 'ar',
  };
}