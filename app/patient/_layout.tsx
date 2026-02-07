import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function PatientLayout() {
  return (
    <View style={styles.container}>
      {/* Header custom của bạn */}
      <View style={styles.header}>
        {/* Nội dung header */}
      </View>
      
      {/* Nội dung chính */}
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 30, // Chiều cao header
    // Thêm các style khác cho header
  },
  content: {
    flex: 1, // Chiếm toàn bộ không gian còn lại
  }
});