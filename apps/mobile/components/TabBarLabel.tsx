import React from 'react';
import { Typography } from './ui/Typography';
import { useLocale } from '@/contexts/LocaleContext';

interface TabBarLabelProps {
  children: string;
  focused: boolean;
  color: string;
}

export function TabBarLabel({ children, focused, color }: TabBarLabelProps) {
  const { locale } = useLocale();
  
  return (
    <Typography
      font={locale === 'ar' ? 'noto-kufi' : 'poppins'}
      weight={focused ? 'semibold' : 'regular'}
      size="xs"
      style={{ color }}
    >
      {children}
    </Typography>
  );
}