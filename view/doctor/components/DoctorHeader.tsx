import { View, Text, StyleSheet } from 'react-native';

const DoctorHeader = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Hello, Dr. Smith</Text>
        <Text style={styles.subtitle}>Cardiologist • City Hospital</Text>
      </View>

      <View style={styles.avatar}>
        <Text style={styles.avatarText}>JS</Text>
      </View>
    </View>
  );
};

export default DoctorHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2563eb',
    padding: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: '#bfdbfe',
    fontSize: 12,
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#2563eb',
    fontWeight: '700',
  },
});
