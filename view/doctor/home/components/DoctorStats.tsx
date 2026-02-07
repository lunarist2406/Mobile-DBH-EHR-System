import { CheckCircle, Clock, TrendingUp, Users } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const DoctorStats = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Thống Kê Hôm Nay</Text>
      
      <View style={styles.row}>
        {/* Hàng đợi khám */}
        <View style={styles.card}>
          <View style={[styles.iconBadge, { backgroundColor: '#DBEAFE' }]}>
            <Clock size={18} color="#3B82F6" strokeWidth={2.5} />
          </View>
          
          <Text style={styles.cardLabel}>Hàng đợi</Text>
          <Text style={[styles.cardValue, { color: '#3B82F6' }]}>14</Text>
          
          <View style={styles.metaRow}>
            <View style={styles.statusDot} />
            <Text style={styles.metaText}>2 đang chờ khám</Text>
          </View>
        </View>

        {/* Tính toàn vẹn */}
        <View style={styles.card}>
          <View style={[styles.iconBadge, { backgroundColor: '#D1FAE5' }]}>
            <CheckCircle size={18} color="#10B981" strokeWidth={2.5} />
          </View>
          
          <Text style={styles.cardLabel}>Toàn vẹn</Text>
          <Text style={[styles.cardValue, { color: '#10B981' }]}>100%</Text>
          
          <View style={styles.metaRow}>
            <CheckCircle size={11} color="#10B981" strokeWidth={2.5} />
            <Text style={[styles.metaText, { color: '#10B981' }]}>Đã đồng bộ</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.row}>
        {/* Bệnh nhân */}
        <View style={styles.card}>
          <View style={[styles.iconBadge, { backgroundColor: '#FEF3C7' }]}>
            <Users size={18} color="#F59E0B" strokeWidth={2.5} />
          </View>
          
          <Text style={styles.cardLabel}>Bệnh nhân</Text>
          <Text style={[styles.cardValue, { color: '#F59E0B' }]}>28</Text>
          
          <View style={styles.metaRow}>
            <TrendingUp size={11} color="#F59E0B" strokeWidth={2.5} />
            <Text style={[styles.metaText, { color: '#F59E0B' }]}>+12% so hôm qua</Text>
          </View>
        </View>

        {/* Truy cập */}
        <View style={styles.card}>
          <View style={[styles.iconBadge, { backgroundColor: '#EDE9FE' }]}>
            <TrendingUp size={18} color="#8B5CF6" strokeWidth={2.5} />
          </View>
          
          <Text style={styles.cardLabel}>Lượt truy cập</Text>
          <Text style={[styles.cardValue, { color: '#8B5CF6' }]}>142</Text>
          
          <View style={styles.metaRow}>
            <View style={[styles.statusDot, { backgroundColor: '#8B5CF6' }]} />
            <Text style={styles.metaText}>HSBÀ & xét nghiệm</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
  },
  
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000D28',
    marginBottom: 16,
    paddingHorizontal: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  row: { 
    flexDirection: 'row', 
    gap: 12, 
    marginBottom: 12,
  },
  
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  
  cardLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  
  cardValue: {
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 8,
    letterSpacing: -1,
  },
  
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  
  metaText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
  },
});