import { Pressable, StyleSheet, Text, View } from 'react-native';

const ConsentRequests = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Consent Requests</Text>

      <View style={styles.card}>
        <Text style={styles.name}>Jane Doe</Text>
        <Text style={styles.desc}>
          Requested access to Medical History.
        </Text>

        <View style={styles.actions}>
          <Pressable style={styles.deny}>
            <Text>Deny</Text>
          </Pressable>

          <Pressable style={styles.approve}>
            <Text style={{ color: 'white' }}>Approve</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ConsentRequests;

const styles = StyleSheet.create({
  wrapper: { marginTop: 32 },
  heading: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  card: {
    backgroundColor: '#fff7ed',
    padding: 16,
    borderRadius: 20,
  },
  name: { fontWeight: '700' },
  desc: { fontSize: 12, color: '#64748b', marginTop: 4 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 12 },
  deny: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  approve: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
});
