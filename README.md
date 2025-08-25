# 🏠 Aqaryo

> Modern real estate platform for discovering and listing properties across the Gulf region

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Turbo](https://img.shields.io/badge/Turbo-Monorepo-EF4444?style=flat-square&logo=turborepo)](https://turbo.build/)

## ✨ Features

- 🌍 **Internationalization** - Full Arabic/English support with RTL layout
- 📱 **Cross-platform** - Next.js web app + Expo React Native mobile app
- 🎨 **Modern UI** - Beautiful interface with shadcn/ui components
- 🔍 **Property Search** - Advanced filtering and location-based search
- 👥 **Agent Directory** - Find and connect with real estate professionals
- 📊 **Analytics** - Vercel Analytics integration for insights
- 🏗️ **Monorepo** - Turborepo for efficient development workflow
- 📍 **Multi-country** - Support for UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React

### Mobile
- **Framework**: Expo React Native
- **Navigation**: Expo Router
- **Platform**: iOS & Android

### Internationalization
- **i18n**: next-intl
- **Languages**: English, Arabic
- **RTL Support**: Full right-to-left layout
- **Fonts**: Poppins, Outfit (Latin), Cairo, Noto Sans Arabic (Arabic)

### Development
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Analytics**: Vercel Analytics

## 📁 Project Structure

```
aqaryo/
├── apps/
│   ├── web/           # Next.js web application
│   └── mobile/        # Expo React Native app
├── packages/
│   ├── ui/            # Shared UI components
│   ├── eslint-config/ # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript config
└── turbo.json         # Turborepo configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm 9.0+
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/aqaryo.git
   cd aqaryo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development servers**
   ```bash
   # Start all apps (web + mobile + docs)
   pnpm dev
   
   # Or start individual apps
   pnpm dev --filter=web        # Web app only
   pnpm dev --filter=mobile     # Mobile app only
   ```

4. **Open in browser**
   - Web app: http://localhost:3000
   - Documentation: http://localhost:3001

### Mobile Development

1. **iOS Simulator**
   ```bash
   cd apps/mobile
   pnpm run ios
   ```

2. **Android Emulator**
   ```bash
   cd apps/mobile
   pnpm run android
   ```

3. **Physical Device**
   ```bash
   cd apps/mobile
   pnpm start
   # Scan QR code with Expo Go app
   ```

## 🌍 Internationalization

The app supports English and Arabic with full RTL (right-to-left) layout:

- **English**: `/en/*` routes
- **Arabic**: `/ar/*` routes  
- **Auto-detection**: Redirects `/` to default locale
- **Language switcher**: Available in header
- **RTL Support**: Automatic layout flipping for Arabic

### Adding Translations

1. **Add keys to message files**:
   - `apps/web/messages/en.json`
   - `apps/web/messages/ar.json`

2. **Use in components**:
   ```tsx
   import { TranslatedText } from "@/components/ui/TranslatedText"
   
   <TranslatedText 
     t="homepage.heroTitle" 
     as="h1"
     className="text-4xl font-bold"
     fallback="Default text"
   />
   ```

## 🏗️ Available Scripts

### Root Level
- `pnpm dev` - Start all development servers
- `pnpm build` - Build all applications
- `pnpm lint` - Lint all packages
- `pnpm check-types` - Type check all packages

### Web App (`apps/web`)
- `pnpm dev` - Start Next.js development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm check-types` - TypeScript type checking

### Mobile App (`apps/mobile`)
- `pnpm dev` - Start iOS development build
- `pnpm dev:android` - Start Android development build
- `pnpm ios` - Run on iOS simulator
- `pnpm android` - Run on Android emulator
- `pnpm prebuild` - Generate native code
- `pnpm build` - Export app bundle

## 🚀 Deployment

### Web App (Vercel)
1. Connect repository to Vercel
2. Set build command: `cd apps/web && pnpm build`
3. Set output directory: `apps/web/.next`
4. Deploy automatically on push to main

### Mobile App (EAS Build)
```bash
cd apps/mobile

# Install EAS CLI
npm install -g @expo/eas-cli

# Configure build
eas build:configure

# Build for production
eas build --platform all
```

## 📱 Platform Support

### Web
- ✅ Chrome, Firefox, Safari, Edge (modern versions)
- ✅ Mobile browsers
- ✅ Progressive Web App features

### Mobile
- ✅ iOS 13+
- ✅ Android API 21+ (Android 5.0+)
- ✅ Expo managed workflow
- ✅ Custom development builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Expo](https://expo.dev/) - React Native platform
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Turborepo](https://turbo.build/) - Monorepo tooling
- [Vercel](https://vercel.com/) - Deployment platform

---

Built with ❤️ for the Gulf region's real estate market