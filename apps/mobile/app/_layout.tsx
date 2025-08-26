import '@/global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';

import { ThemeProvider as CustomThemeProvider, useTheme } from '@/contexts/theme-context';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <View
        className={`flex-1 ${isDark ? 'dark' : ''}`}
      // style={{ colorScheme: isDark ? 'dark' : 'light' }}
      >
        {children}
      </View>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({});

  if (!loaded) {
    return null;
  }

  return (
    <CustomThemeProvider>
      <ThemeWrapper>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeWrapper>
    </CustomThemeProvider>
  );
}
