import { Calendar, FileText, Filter, MapPin, Search, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'records', label: 'Records' },
    { id: 'hospitals', label: 'Hospitals' },
    { id: 'medications', label: 'Medications' },
  ];

  const searchHistory = [
    'Dr. Sarah Johnson',
    'Blood test results',
    'Cardiology department',
    'Prescription refill',
    'MRI scan 2024',
  ];

  const recentSearches = [
    {
      id: '1',
      type: 'doctor',
      title: 'Dr. Michael Chen',
      subtitle: 'Dermatologist',
      icon: <User size={20} color="#3A8AFF" />,
    },
    {
      id: '2',
      type: 'record',
      title: 'Lab Report - March 2024',
      subtitle: 'Complete blood count',
      icon: <FileText size={20} color="#10B981" />,
    },
    {
      id: '3',
      type: 'hospital',
      title: 'City Hospital',
      subtitle: 'Main branch - Cardiology',
      icon: <MapPin size={20} color="#EF4444" />,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Search</Text>
          <Text style={styles.headerSubtitle}>
            Find doctors, records, hospitals, and more
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#94A3B8" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for doctors, records, hospitals..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#94A3B8"
            />
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#3A8AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                activeFilter === filter.id && styles.activeFilterButton,
              ]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter.id && styles.activeFilterText,
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recent Searches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <TouchableOpacity>
              <Text style={styles.clearText}>Clear all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.recentSearches}>
            {recentSearches.map((item) => (
              <TouchableOpacity key={item.id} style={styles.recentItem}>
                <View style={styles.recentIconContainer}>
                  {item.icon}
                </View>
                <View style={styles.recentInfo}>
                  <Text style={styles.recentTitle}>{item.title}</Text>
                  <Text style={styles.recentSubtitle}>{item.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Search History</Text>
            <TouchableOpacity>
              <Text style={styles.clearText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.historyContainer}>
            {searchHistory.map((item, index) => (
              <TouchableOpacity key={index} style={styles.historyItem}>
                <Search size={16} color="#94A3B8" />
                <Text style={styles.historyText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Searches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular This Week</Text>
          <View style={styles.popularGrid}>
            <TouchableOpacity style={styles.popularCard}>
              <View style={[styles.popularIcon, { backgroundColor: '#EFF6FF' }]}>
                <Calendar size={24} color="#3A8AFF" />
              </View>
              <Text style={styles.popularTitle}>Book Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.popularCard}>
              <View style={[styles.popularIcon, { backgroundColor: '#F0F9FF' }]}>
                <FileText size={24} color="#0EA5E9" />
              </View>
              <Text style={styles.popularTitle}>View Records</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#0F172A',
  },
  filterIconButton: {
    padding: 8,
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  filtersContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeFilterButton: {
    backgroundColor: '#3A8AFF',
    borderColor: '#3A8AFF',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  section: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  clearText: {
    fontSize: 14,
    color: '#3A8AFF',
    fontWeight: '500',
  },
  recentSearches: {
    gap: 12,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  recentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recentInfo: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
  },
  recentSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  historyContainer: {
    gap: 8,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  historyText: {
    fontSize: 14,
    color: '#475569',
    marginLeft: 12,
  },
  popularGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popularCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  popularIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  popularTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    textAlign: 'center',
  },
});