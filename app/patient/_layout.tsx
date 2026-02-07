import { Slot } from 'expo-router';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

export default function PatientLayout() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={Platform.OS === 'ios' ? '#FFFFFF' : '#0F2A5F'}
        translucent={Platform.OS === 'android'} // Android: cho phép content chạy dưới status bar
      />
      <View style={[
        styles.container,
        Platform.OS === 'android' && StatusBar.currentHeight ? {
          paddingTop: StatusBar.currentHeight, // Bù padding cho Android khi status bar translucent
        } : undefined
      ]}>

        {/* Nội dung chính */}
        <View style={styles.content}>
          <Slot />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#0F2A5F',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  content: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});