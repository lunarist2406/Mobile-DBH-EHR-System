import { Tabs } from 'expo-router';
import {
    Calendar,
    Home,
    Search as SearchIcon,
    User,
    FileText,
    Bell,
    Shield
} from 'lucide-react-native';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: [
          styles.tabBar,
          {
            height: Platform.OS === 'ios' ? 84 : 70,
            paddingBottom: Platform.OS === 'ios' ? insets.bottom : 12,
          }
        ],
        tabBarActiveTintColor: '#3A8AFF',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <Home 
                size={22} 
                color={focused ? '#3A8AFF' : color} 
                fill={focused ? '#3A8AFF' : 'none'}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: 'Hồ sơ',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <FileText 
                size={22} 
                color={focused ? '#3A8AFF' : color} 
                fill={focused ? '#3A8AFF' : 'none'}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Lịch hẹn',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <Calendar 
                size={22} 
                color={focused ? '#3A8AFF' : color} 
                fill={focused ? '#3A8AFF' : 'none'}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          ),
        }}
      />
      {/* Sử dụng 'search' thay vì 'notifications' */}
      <Tabs.Screen
        name="search"
        options={{
          title: 'Tìm kiếm',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <SearchIcon 
                size={22} 
                color={focused ? '#3A8AFF' : color} 
                fill={focused ? '#3A8AFF' : 'none'}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          ),
        }}
      />
      {/* Sử dụng 'settings' thay vì 'profile' */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Cài đặt',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <User 
                size={22} 
                color={focused ? '#3A8AFF' : color} 
                fill={focused ? '#3A8AFF' : 'none'}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    position: 'absolute',
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 16,
        borderTopWidth: 0,
      },
    }),
  },
  tabBarItem: {
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: Platform.OS === 'ios' ? 2 : 4,
    marginBottom: Platform.OS === 'ios' ? 0 : 4,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconContainerActive: {
    backgroundColor: '#EFF6FF',
    ...Platform.select({
      ios: {
        shadowColor: '#3A8AFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});