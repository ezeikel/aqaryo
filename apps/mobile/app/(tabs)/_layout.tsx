import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { faHouse, faMagnifyingGlass, faHeart, faUser } from "@fortawesome/pro-regular-svg-icons";
import { faHouse as faHouseSolid, faMagnifyingGlass as faMagnifyingGlassSolid, faHeart as faHeartSolid, faUser as faUserSolid } from "@fortawesome/pro-solid-svg-icons";
import { TabBarLabel } from '@/components/TabBarLabel';
import { useTranslation } from '@/contexts/LocaleContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1C4548',
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
          tabBarIcon: ({ color, focused }) => <FontAwesomeIcon size={24} icon={focused ? faHouseSolid : faHouse} color={color} />,
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
          tabBarIcon: ({ color, focused }) => <FontAwesomeIcon size={24} icon={focused ? faMagnifyingGlassSolid : faMagnifyingGlass} color={color} />,
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
          tabBarIcon: ({ color, focused }) => <FontAwesomeIcon size={24} icon={focused ? faHeartSolid : faHeart} color={color} />,
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
          tabBarIcon: ({ color, focused }) => <FontAwesomeIcon size={24} icon={focused ? faUserSolid : faUser} color={color} />,
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
