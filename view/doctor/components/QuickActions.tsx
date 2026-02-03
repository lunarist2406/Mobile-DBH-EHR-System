import { View, Text, StyleSheet } from 'react-native';
import { FilePlus, Microscope, Pill, Camera } from 'lucide-react-native';

const actions = [
  { icon: FilePlus, label: 'New EHR', bg: '#dbeafe', color: '#2563eb' },
  { icon: Microscope, label: 'Order Test', bg: '#ede9fe', color: '#7c3aed' },
  { icon: Pill, label: 'Prescribe', bg: '#dcfce7', color: '#16a34a' },
  { icon: Camera, label: 'Attach', bg: '#ffedd5', color: '#ea580c' },
];

const QuickActions = () => {
  return (
    <View style={styles.grid}>
      {actions.map((a, i) => {
        const Icon = a.icon;
        return (
          <View key={i} style={styles.item}>
            <View style={[styles.iconBox, { backgroundColor: a.bg }]}>
              <Icon size={22} color={a.color} />
            </View>
            <Text style={styles.label}>{a.label}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default QuickActions;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  item: { alignItems: 'center', width: '23%' },
  iconBox: { padding: 12, borderRadius: 16 },
  label: { fontSize: 11, fontWeight: '600', marginTop: 6 },
});
