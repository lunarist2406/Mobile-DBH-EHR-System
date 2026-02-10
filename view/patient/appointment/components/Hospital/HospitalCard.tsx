import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { MapPin, Star, Phone, Clock, Navigation } from 'lucide-react-native';
import { Hospital } from '@/types/patient/appointment';

interface HospitalCardProps {
  hospital: Hospital;
  onPress?: () => void;
  onBook?: () => void;
  showDistance?: boolean;
}

export default function HospitalCard({ 
  hospital, 
  onPress, 
  onBook,
  showDistance = true 
}: HospitalCardProps) {
  
  const getHospitalTypeText = (type: string) => {
    switch (type) {
      case 'PUBLIC': return 'Công lập';
      case 'PRIVATE': return 'Tư nhân';
      case 'SPECIALIZED': return 'Chuyên khoa';
      default: return type;
    }
  };

  const getHospitalLevelText = (level: string) => {
    switch (level) {
      case 'LEVEL_1': return 'Cấp I';
      case 'LEVEL_2': return 'Cấp II';
      case 'LEVEL_3': return 'Cấp III';
      default: return level;
    }
  };

  const formatOperatingHours = () => {
    if (!hospital.operating_hours || Object.keys(hospital.operating_hours).length === 0) {
      return '08:00 - 17:00';
    }
    
    const hours = hospital.operating_hours['mon'] || hospital.operating_hours['tue'] || {};
    if (hours.open && hours.close) {
      return `${hours.open} - ${hours.close}`;
    }
    return '08:00 - 17:00';
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const handleBook = () => {
    if (onBook) {
      onBook();
    }
  };

  return (
    <TouchableOpacity 
      style={styles.hospitalCard} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.hospitalHeader}>
        <View style={styles.hospitalImage}>
          {hospital.image_url ? (
            <Image 
              source={{ uri: hospital.image_url }} 
              style={styles.hospitalImageContent}
            />
          ) : (
            <Text style={styles.hospitalImagePlaceholder}>🏥</Text>
          )}
        </View>
        
        <View style={styles.hospitalInfo}>
          <View style={styles.hospitalNameContainer}>
            <Text style={styles.hospitalName}>{hospital.name}</Text>
          </View>
          
          <View style={styles.hospitalTypeContainer}>
            <View style={styles.hospitalType}>
              <Text style={styles.hospitalTypeText}>
                {getHospitalTypeText(hospital.hospital_type)}
              </Text>
            </View>
            
            <View style={styles.hospitalLevel}>
              <Text style={styles.hospitalLevelText}>
                {getHospitalLevelText(hospital.level)}
              </Text>
            </View>
          </View>
          
          <View style={styles.hospitalDetails}>
            <View style={styles.addressContainer}>
              <MapPin size={14} color="#64748B" style={styles.mapIcon} />
              <Text style={styles.hospitalAddress} numberOfLines={2}>
                {hospital.address}
              </Text>
            </View>
            
            {showDistance && hospital.distance && (
              <View style={styles.distanceBadge}>
                <Navigation size={10} color="#FFFFFF" />
                <Text style={styles.distanceText}>
                  {hospital.distance.toFixed(1)} km
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      
      {/* Chuyên khoa nổi bật */}
      {hospital.specialties && hospital.specialties.length > 0 && (
        <View style={styles.hospitalSpecialties}>
          {hospital.specialties.slice(0, 3).map((specialty, index) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyTagText}>{specialty}</Text>
            </View>
          ))}
          {hospital.specialties.length > 3 && (
            <Text style={styles.moreSpecialtiesText}>
              +{hospital.specialties.length - 3}
            </Text>
          )}
        </View>
      )}
      
      {/* Cơ sở vật chất */}
      {hospital.facilities && hospital.facilities.length > 0 && (
        <View style={styles.hospitalFacilities}>
          {hospital.facilities.slice(0, 4).map((facility, index) => (
            <View key={index} style={styles.facilityTag}>
              <Text style={styles.facilityTagText}>{facility}</Text>
            </View>
          ))}
          {hospital.facilities.length > 4 && (
            <Text style={styles.moreFacilitiesText}>
              +{hospital.facilities.length - 4}
            </Text>
          )}
        </View>
      )}
      
      {/* Thông tin bổ sung */}
      <View style={styles.additionalInfo}>
        <View style={styles.operatingHours}>
          <Clock size={14} color="#64748B" style={styles.clockIcon} />
          <Text style={styles.operatingHoursText}>
            {formatOperatingHours()}
          </Text>
        </View>
        
        {hospital.phone && (
          <View style={styles.phoneContainer}>
            <Phone size={14} color="#64748B" style={styles.phoneIcon} />
            <Text style={styles.phoneText}>
              {hospital.phone}
            </Text>
          </View>
        )}
      </View>
      
      {/* Footer với rating và actions */}
      <View style={styles.hospitalFooter}>
        <View style={styles.hospitalRating}>
          <Star size={14} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.ratingValue}>
            {hospital.average_rating?.toFixed(1) || 'N/A'}
          </Text>
          <Text style={styles.reviewCount}>
            ({hospital.review_count?.toLocaleString() || 0} đánh giá)
          </Text>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.viewDetailsButton}
            onPress={handlePress}
          >
            <Text style={styles.viewDetailsText}>Chi tiết</Text>
          </TouchableOpacity>
          
          {onBook && (
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={handleBook}
            >
              <Text style={styles.bookButtonText}>Đặt lịch</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  hospitalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  hospitalHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  hospitalImage: {
    marginRight: 12,
  },
  hospitalImageContent: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  hospitalImagePlaceholder: {
    fontSize: 32,
    color: '#3A8AFF',
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  hospitalTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  hospitalType: {
    backgroundColor: '#3A8AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  hospitalTypeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  hospitalLevel: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#3A8AFF',
  },
  hospitalLevelText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3A8AFF',
  },
  hospitalDetails: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  mapIcon: {
    marginTop: 2,
    marginRight: 6,
  },
  hospitalAddress: {
    fontSize: 13,
    color: '#64748B',
    flex: 1,
    lineHeight: 18,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  distanceText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  hospitalSpecialties: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  specialtyTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 4,
  },
  specialtyTagText: {
    fontSize: 12,
    color: '#64748B',
  },
  moreSpecialtiesText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  hospitalFacilities: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  facilityTag: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  facilityTagText: {
    fontSize: 12,
    color: '#16A34A',
  },
  moreFacilitiesText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  operatingHours: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    marginRight: 6,
  },
  operatingHoursText: {
    fontSize: 12,
    color: '#64748B',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneIcon: {
    marginRight: 6,
  },
  phoneText: {
    fontSize: 12,
    color: '#64748B',
  },
  hospitalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hospitalRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F2A5F',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  viewDetailsButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3A8AFF',
    backgroundColor: '#FFFFFF',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3A8AFF',
  },
  bookButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#3A8AFF',
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});