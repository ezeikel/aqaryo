import { ExpoConfig, ConfigContext } from 'expo/config';
import pkg from './package.json';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Aqaryo',
  slug: 'aqaryo',
  version: pkg.version,
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'aqaryo',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  owner: 'chewybytes',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.chewybytes.aqaryo',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#1C4548',
    },
    edgeToEdgeEnabled: true,
    package: 'com.chewybytes.aqaryo',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#1C4548',
      },
    ],
  ],
  extra: {
    eas: {
      projectId: "eb120a79-7b1c-4544-bb8f-ad13c8b38aa1",
    },
  },
  experiments: {
    typedRoutes: true,
  },
});