import { Tabs } from 'expo-router';
import {
    Calendar,
    Home,
    Search as SearchIcon,
    User,
    FileText,
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
            height: Platform.select({
              ios: 84,
              android: 68,
            }),
            paddingBottom: Platform.select({
              ios: insets.bottom,
              android: 8,
            }),
            paddingTop: Platform.select({
              ios: 12,
              android: 8,
            }),
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
                size={Platform.select({ ios: 22, android: 20 })} 
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
                size={Platform.select({ ios: 22, android: 20 })} 
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
                size={Platform.select({ ios: 22, android: 20 })} 
                color={focused ? '#3A8AFF' : color} 
                fill={focused ? '#3A8AFF' : 'none'}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Tìm kiếm',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <SearchIcon 
                size={Platform.select({ ios: 22, android: 20 })} 
                color={focused ? '#3A8AFF' : color} 
                fill={focused ? '#3A8AFF' : 'none'}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Cài đặt',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <User 
                size={Platform.select({ ios: 22, android: 20 })} 
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
    borderTopWidth: StyleSheet.hairlineWidth,
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
        elevation: 8,
        borderTopWidth: 0,
      },
    }),
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: {
    fontSize: Platform.select({ ios: 11, android: 10 }),
    fontWeight: '600',
    marginTop: Platform.select({ ios: 2, android: 4 }),
    marginBottom: 0,
  },
  iconContainer: {
    width: Platform.select({ ios: 44, android: 40 }),
    height: Platform.select({ ios: 44, android: 40 }),
    borderRadius: Platform.select({ ios: 12, android: 10 }),
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
        // Sử dụng border thay vì elevation để trông tinh tế hơn
        borderWidth: 1.5,
        borderColor: 'rgba(58, 138, 255, 0.2)',
      },
    }),
  },
});