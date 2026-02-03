import { CheckCircle, Clock } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

const StatisticsCards = () => {
  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <Text style={styles.label}>Total Patients</Text>
        <Text style={styles.value}>124</Text>
        <View style={styles.rowSmall}>
          <CheckCircle size={12} color="green" />
          <Text style={styles.small}> +3 today</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Appointments</Text>
        <Text style={styles.value}>12</Text>
        <View style={styles.rowSmall}>
          <Clock size={12} color="#2563eb" />
          <Text style={styles.small}> 4 upcoming</Text>
        </View>
      </View>
    </View>
  );
};

export default StatisticsCards;

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 16, marginTop: 32 },
  card: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 20,
  },
  label: { fontSize: 12, color: '#94a3b8' },
  value: { fontSize: 24, fontWeight: '700', marginVertical: 4 },
  rowSmall: { flexDirection: 'row', alignItems: 'center' },
  small: { fontSize: 10 },
});
