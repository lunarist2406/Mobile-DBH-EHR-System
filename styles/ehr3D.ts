import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    height: 280,
    borderRadius: 32,
    backgroundColor: '#1e3a8a',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  badge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },

  subtitle: {
    color: '#c7d2fe',
    fontSize: 12,
  },

  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  metaBox: {
    width: '30%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 12,
  },

  metaLabel: {
    fontSize: 10,
    color: '#e5e7eb',
    opacity: 0.7,
  },

  metaValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
  },
});
