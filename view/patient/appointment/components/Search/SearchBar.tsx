import { Filter, Search } from 'lucide-react-native';
import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
  filterCount?: number;
}

export default function SearchBar({
  placeholder = 'Tìm kiếm...',
  value,
  onChangeText,
  onFilterPress,
  filterCount = 0,
}: SearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchIcon}>
        <Search size={20} color="#64748B" />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#94A3B8"
      />
      <TouchableOpacity
        style={styles.filterButton}
        onPress={onFilterPress}
      >
        <Filter size={20} color="#64748B" />
        {filterCount > 0 && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>{filterCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    padding: 0,
    margin: 0,
  },
  filterButton: {
    padding: 8,
    marginLeft: 8,
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  filterBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});