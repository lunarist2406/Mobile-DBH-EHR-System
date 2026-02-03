import { View, Text, StyleSheet } from 'react-native';

const data = [
  { name: 'Robert Fox', time: '10:30 AM', type: 'Follow-up', status: 'In Waiting' },
  { name: 'Emily Wilson', time: '11:15 AM', type: 'Consultation', status: 'Scheduled' },
];

const UpcomingAppointments = () => {
  return (
    <View style={{ marginTop: 32 }}>
      <Text style={styles.heading}>Upcoming Appointments</Text>

      {data.map((p, i) => (
        <View key={i} style={styles.card}>
          <View>
            <Text style={styles.name}>{p.name}</Text>
            <Text style={styles.meta}>
              {p.type} • {p.time}
            </Text>
          </View>
          <Text style={styles.status}>{p.status}</Text>
        </View>
      ))}
    </View>
  );
};

export default UpcomingAppointments;

const styles = StyleSheet.create({
  heading: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  name: { fontWeight: '700' },
  meta: { fontSize: 12 },
  status: { fontSize: 12, fontWeight: '700' },
});
