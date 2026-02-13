import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { Calendar, Stethoscope, ChevronLeft, Clock } from 'lucide-react-native';
import { Appointment, Encounter } from '@/types/patient/appointment';
import AppointmentCard from './AppointmentCard';
import EncounterCard from '../EncounterCard';


interface NotificationsScreenProps {
  appointments: Appointment[];
  encounters: Encounter[];
  onBack: () => void;
}

export default function ControllingAppointScreen({ 
  appointments, 
  encounters, 
  onBack 
}: NotificationsScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  // Phân loại appointments
  const now = new Date();
  const upcomingAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.scheduled_at);
    return aptDate > now && apt.status !== 'cancelled';
  });

  const pastAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.scheduled_at);
    return aptDate <= now || apt.status === 'completed' || apt.status === 'cancelled';
  });

  // Tính tổng số thông báo
  const totalCount = upcomingAppointments.length + pastAppointments.length + encounters.length;

  const renderContent = () => {
    switch (activeTab) {
      case 'upcoming':
        return (
          <>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Clock size={18} color="#3A8AFF" />
                <Text style={styles.sectionTitle}>Sắp diễn ra</Text>
              </View>
              <Text style={styles.sectionCount}>{upcomingAppointments.length}</Text>
            </View>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => (
                <AppointmentCard
                  key={appointment.appointment_id}
                  appointment={appointment}
                />
              ))
            ) : (
              <View style={styles.emptySection}>
                <Calendar size={32} color="#94A3B8" />
                <Text style={styles.emptyText}>Không có lịch hẹn sắp tới</Text>
              </View>
            )}
          </>
        );

      case 'past':
        return (
          <>
            {/* Appointments đã qua */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Calendar size={18} color="#64748B" />
                <Text style={styles.sectionTitle}>Lịch hẹn đã qua</Text>
              </View>
              <Text style={styles.sectionCount}>{pastAppointments.length}</Text>
            </View>
            {pastAppointments.length > 0 ? (
              pastAppointments.map(appointment => (
                <AppointmentCard
                  key={appointment.appointment_id}
                  appointment={appointment}
                />
              ))
            ) : (
              <View style={styles.emptySection}>
                <Calendar size={32} color="#94A3B8" />
                <Text style={styles.emptyText}>Không có lịch hẹn đã qua</Text>
              </View>
            )}

            {/* Encounters */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Stethoscope size={18} color="#8B5CF6" />
                <Text style={styles.sectionTitle}>Lịch sử khám bệnh</Text>
              </View>
              <Text style={styles.sectionCount}>{encounters.length}</Text>
            </View>
            {encounters.length > 0 ? (
              encounters.map(encounter => (
                <EncounterCard
                  key={encounter.encounter_id}
                  encounter={encounter}
                />
              ))
            ) : (
              <View style={styles.emptySection}>
                <Stethoscope size={32} color="#94A3B8" />
                <Text style={styles.emptyText}>Không có lịch sử khám bệnh</Text>
              </View>
            )}
          </>
        );

      case 'all':
      default:
        return (
          <>
            {/* Appointments sắp tới */}
            {upcomingAppointments.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleContainer}>
                    <Clock size={18} color="#3A8AFF" />
                    <Text style={styles.sectionTitle}>Sắp diễn ra</Text>
                  </View>
                  <Text style={styles.sectionCount}>{upcomingAppointments.length}</Text>
                </View>
                {upcomingAppointments.map(appointment => (
                  <AppointmentCard
                    key={appointment.appointment_id}
                    appointment={appointment}
                  />
                ))}
              </>
            )}

            {/* Appointments đã qua */}
            {pastAppointments.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleContainer}>
                    <Calendar size={18} color="#64748B" />
                    <Text style={styles.sectionTitle}>Lịch hẹn đã qua</Text>
                  </View>
                  <Text style={styles.sectionCount}>{pastAppointments.length}</Text>
                </View>
                {pastAppointments.map(appointment => (
                  <AppointmentCard
                    key={appointment.appointment_id}
                    appointment={appointment}
                  />
                ))}
              </>
            )}

            {/* Encounters */}
            {encounters.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleContainer}>
                    <Stethoscope size={18} color="#8B5CF6" />
                    <Text style={styles.sectionTitle}>Lịch sử khám bệnh</Text>
                  </View>
                  <Text style={styles.sectionCount}>{encounters.length}</Text>
                </View>
                {encounters.map(encounter => (
                  <EncounterCard
                    key={encounter.encounter_id}
                    encounter={encounter}
                  />
                ))}
              </>
            )}

            {/* Hiển thị thông báo nếu không có gì */}
            {totalCount === 0 && (
              <View style={styles.emptyState}>
                <Calendar size={48} color="#94A3B8" />
                <Text style={styles.emptyStateText}>Không có thông báo</Text>
                <Text style={styles.emptyStateSubtext}>
                  Tất cả lịch hẹn và cuộc gặp của bạn sẽ xuất hiện ở đây
                </Text>
              </View>
            )}
          </>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ChevronLeft size={24} color="#64748B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thông báo</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{totalCount}</Text>
          </View>
        </View>
        
        <Text style={styles.headerSubtitle}>
          Lịch hẹn sắp tới, đã qua và lịch sử khám bệnh
        </Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabBar}>
        {[
          { id: 'all', label: 'Tất cả', count: totalCount },
          { id: 'upcoming', label: 'Sắp tới', count: upcomingAppointments.length },
          { id: 'past', label: 'Đã qua', count: pastAppointments.length + encounters.length },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.id as any)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText,
            ]}>
              {tab.label}
            </Text>
            <View style={[
              styles.tabCount,
              activeTab === tab.id && styles.activeTabCount,
            ]}>
              <Text style={styles.tabCountText}>{tab.count}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {renderContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  badgeContainer: {
    backgroundColor: '#EF4444',
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 4,
    marginHorizontal: 20,
    marginBottom: 16,
    marginTop: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  activeTabText: {
    color: '#3A8AFF',
    fontWeight: '600',
  },
  tabCount: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  activeTabCount: {
    backgroundColor: '#EFF6FF',
  },
  tabCountText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  sectionCount: {
    fontSize: 14,
    color: '#3A8AFF',
    fontWeight: '600',
  },
  emptySection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginTop: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
});