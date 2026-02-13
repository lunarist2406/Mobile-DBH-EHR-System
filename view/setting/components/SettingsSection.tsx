import { SettingsItem as SettingsItemType } from '@/types/settings';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SettingsItem from './SettingsItem';

interface Props {
  title: string;
  items: SettingsItemType[];
  onItemPress?: (itemTitle: string) => void;
}

const SettingsSection: React.FC<Props> = ({ title, items, onItemPress }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {items.map((item, index) => (
          <SettingsItem
            key={index}
            {...item}
            onPress={() => onItemPress?.(item.title)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  sectionContent: {
    paddingTop: 8,
  },
});

export default SettingsSection;