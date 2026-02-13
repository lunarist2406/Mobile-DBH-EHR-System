import { Slot } from 'expo-router';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function PatientLayout() {
  return (
    // SafeAreaProvider bọc ngoài để cung cấp insets chính xác
    <SafeAreaProvider>
      {/* 
        ✅ FIX GÓC BO TRÒN:
        View ngoài cùng dùng backgroundColor của HỆ THỐNG (đen/trong suốt)
        KHÔNG đặt bg trắng ở đây — nếu không nó sẽ lấp góc bo tròn
      */}
      <View style={styles.root}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true} // Cả iOS lẫn Android đều transparent
        />

        {/* 
          SafeAreaView chỉ lo padding nội dung, KHÔNG lo màu nền hệ thống
          edges: chỉ apply safe area cho top/left/right, KHÔNG bottom
          (bottom được xử lý bởi tab bar với insets.bottom)
        */}
        <SafeAreaView
          style={styles.safeArea}
          edges={['top', 'left', 'right']}
        >
          <View style={styles.content}>
            <Slot />
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // ── Root: toàn màn hình, nền trắng (hiển thị sau SafeArea) ──
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Nền chính của app
  },

  // ── SafeAreaView: chỉ xử lý padding, không cần backgroundColor ──
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  // ── Content area ──
  content: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});