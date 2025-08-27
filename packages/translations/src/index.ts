// Export translation resources
const enTranslations = require('./en.json');
const arTranslations = require('./ar.json');

export const translations = {
  en: enTranslations,
  ar: arTranslations,
} as const;

export const supportedLocales = ['en', 'ar'] as const;
export type SupportedLocale = typeof supportedLocales[number];

// Export individual translations for direct import
export const en = enTranslations;
export const ar = arTranslations;

// Type definitions for better TypeScript support
export type TranslationKeys = keyof typeof enTranslations;

// Helper function to get nested translation keys
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<typeof enTranslations>;

// Default export for convenience
export default translations;