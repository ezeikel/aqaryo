import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { faHouse, faMagnifyingGlass, faHeart, faUser } from "@fortawesome/pro-regular-svg-icons";
import { TabBarLabel } from '@/components/TabBarLabel';
import { useTranslation } from '@/contexts/LocaleContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home', // Static fallback
          tabBarIcon: ({ color }) => <FontAwesomeIcon size={28} icon={faHouse} color={color} />,
          tabBarLabel: ({ focused, color }) => (
            <TabBarLabel focused={focused} color={color}>
              {t('common.home')}
            </TabBarLabel>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <FontAwesomeIcon size={28} icon={faMagnifyingGlass} color={color} />,
          tabBarLabel: ({ focused, color }) => (
            <TabBarLabel focused={focused} color={color}>
              {t('navigation.search')}
            </TabBarLabel>
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color }) => <FontAwesomeIcon size={28} icon={faHeart} color={color} />,
          tabBarLabel: ({ focused, color }) => (
            <TabBarLabel focused={focused} color={color}>
              {t('common.saved')}
            </TabBarLabel>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <FontAwesomeIcon size={28} icon={faUser} color={color} />,
          tabBarLabel: ({ focused, color }) => (
            <TabBarLabel focused={focused} color={color}>
              {t('common.account')}
            </TabBarLabel>
          ),
        }}
      />
    </Tabs>
  );
}
