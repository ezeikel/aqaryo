# @aqaryo/translations

Shared translation package for Aqaryo web and mobile applications.

## Features

- 🌐 **Shared translations** between web and mobile apps
- 🔤 **Multi-language support** (English & Arabic)
- 📱 **TypeScript support** with full type safety
- 🎯 **Single source of truth** for all translations

## Usage

### Basic Import

```typescript
import { translations, en, ar } from '@aqaryo/translations';

// Use the translations object
console.log(translations.en.navigation.search); // "Search"
console.log(translations.ar.navigation.search); // "بحث"

// Or import specific languages
console.log(en.common.home); // "Home"
console.log(ar.common.home); // "الرئيسية"
```

### In Web App (Next.js with next-intl)

```typescript
// i18n/request.ts
import { translations } from "@aqaryo/translations";

export default getRequestConfig(async ({ locale }) => {
  return {
    locale,
    messages: translations[locale],
  };
});
```

### In Mobile App (React Native with react-i18next)

```typescript
// contexts/LocaleContext.tsx
import { en, ar } from '@aqaryo/translations';
import i18n from 'i18next';

i18n.init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
});
```

### Component Usage

```tsx
// Web (Next.js)
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations();
  return <h1>{t('homepage.heroTitle')}</h1>;
}

// Mobile (React Native)
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <Text>{t('homepage.heroTitle')}</Text>;
}
```

## Supported Languages

- **English** (`en`) - Default language
- **Arabic** (`ar`) - RTL language with proper Arabic fonts

## Translation Structure

```
src/
├── en.json          # English translations
├── ar.json          # Arabic translations
└── index.ts         # Export configuration
```

## Type Safety

The package exports TypeScript types for all translation keys:

```typescript
import type { TranslationKey, NestedKeyOf } from '@aqaryo/translations';

// TranslationKey includes all possible nested keys like:
// "navigation.search" | "common.home" | "homepage.heroTitle" | etc.
```

## Adding New Translations

1. Add the key to `src/en.json`
2. Add the corresponding Arabic translation to `src/ar.json`
3. Rebuild the package: `pnpm build`
4. Both web and mobile apps will automatically have access to the new translations

## Development

```bash
# Install dependencies
pnpm install

# Build TypeScript
pnpm build

# Watch for changes
pnpm dev

# Type check
pnpm type-check
```