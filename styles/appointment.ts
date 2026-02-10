import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // ============ LAYOUT & CONTAINER STYLES ============
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // Thêm vào styles
header: {
  backgroundColor: '#FFFFFF',
  paddingTop: 48,
  paddingBottom: 24,
  paddingHorizontal: 20,
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 8,
  marginBottom: 8,
},
headerTopRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
},
iconContainer: {
  width: 44,
  height: 44,
  backgroundColor: '#EFF6FF',
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
},
notificationButton: {
  width: 44,
  height: 44,
  backgroundColor: '#F8FAFC',
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
},
notificationBadge: {
  position: 'absolute',
  top: 10,
  right: 10,
  width: 8,
  height: 8,
  backgroundColor: '#EF4444',
  borderRadius: 4,
},
headerTitle: {
  fontSize: 28,
  fontWeight: '800',
  color: '#0F2A5F',
  marginBottom: 6,
  letterSpacing: 0.3,
},
headerSubtitle: {
  fontSize: 16,
  color: '#64748B',
  lineHeight: 22,
},
  
  // ============ TAB STYLES ============
tabBar: {
  flexDirection: 'row',
  backgroundColor: '#FFFFFF',
  borderBottomWidth: 1,
  borderBottomColor: '#F1F5F9',
  height: 50, // THÊM CHIỀU CAO
  minHeight: 50,
},
tab: {
  paddingHorizontal: 16,
  paddingVertical: 12, // GIẢM XUỐNG
  borderBottomWidth: 2,
  borderBottomColor: 'transparent',
  alignItems: 'center',
  justifyContent: 'center',
},
  activeTab: {
    borderBottomColor: '#3A8AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  activeTabText: {
    color: '#3A8AFF',
  },
  // ============ SCROLL & CONTENT STYLES ============
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,

  },
  
  // ============ SECTION HEADER STYLES ============
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F2A5F',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3A8AFF',
    fontWeight: '600',
  },
  
  // ============ CARD STYLES ============
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  
  // ============ APPOINTMENT CARD SPECIFIC ============
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  specialty: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  reason: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
    marginBottom: 12,
  },
  
  // ============ DETAILS CONTAINER ============
  detailsContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 8,
    marginRight: 8,
    minWidth: 80,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    flex: 1,
  },
  
  // ============ NOTES & DIAGNOSIS ============
  notesContainer: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  notesLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3A8AFF',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 13,
    color: '#1E40AF',
    lineHeight: 18,
  },
  diagnosisContainer: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  diagnosisLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10B981',
    marginBottom: 4,
  },
  diagnosisText: {
    fontSize: 13,
    color: '#047857',
    lineHeight: 18,
  },
  appointmentRef: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 8,
  },
  appointmentRefText: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
  },
  
  // ============ EMPTY STATE ============
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 16,
    marginBottom: 16,
  },
  
  // ============ SEARCH & FILTER STYLES ============
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
    marginLeft: 12,
    padding: 0,
  },
  filterButton: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
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
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  filterBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  
  // ============ FILTER MODAL STYLES ============
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F2A5F',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  activeChip: {
    backgroundColor: '#3A8AFF',
  },
  chipText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  filterFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#3A8AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  applyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  // ============ DOCTOR CARD STYLES ============
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doctorInfoContainer: {
    flex: 1,
  },
  doctorFullName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F2A5F',
    marginBottom: 4,
  },
  doctorSpecialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  specialtyTag: {
    backgroundColor: '#EFF6FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  specialtyTagText: {
    fontSize: 12,
    color: '#3A8AFF',
    fontWeight: '500',
  },
  doctorStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  ratingText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
    marginLeft: 4,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  experienceText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
  },
  doctorSchedule: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scheduleHospitalName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  scheduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  timeSlot: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minWidth: 70,
    alignItems: 'center',
  },
  availableTimeSlot: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  bookedTimeSlot: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  timeSlotText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  availableTimeSlotText: {
    color: '#FFFFFF',
  },
  feeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  feeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F2A5F',
  },
  feeSubtext: {
    fontSize: 12,
    color: '#64748B',
  },
  bookButton: {
    backgroundColor: '#3A8AFF',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  // ============ HOSPITAL CARD STYLES ============
  hospitalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  hospitalHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  hospitalImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F2A5F',
    marginBottom: 6,
  },
  hospitalType: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    backgroundColor: '#3A8AFF',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginRight: 6,
    marginBottom: 4,
  },
  hospitalLevel: {
    fontSize: 12,
    color: '#3A8AFF',
    fontWeight: '600',
    backgroundColor: '#EFF6FF',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  hospitalDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  hospitalAddress: {
    fontSize: 14,
    color: '#64748B',
    flex: 1,
    marginRight: 8,
  },
  distanceBadge: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  distanceText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  hospitalSpecialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  hospitalFacilities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  facilityTag: {
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  facilityTagText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  hospitalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  hospitalRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailsButton: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3A8AFF',
  },
  
  // ============ MODAL STYLES ============
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F2A5F',
    flex: 1,
  },
  modalClose: {
    padding: 8,
    marginLeft: 8,
  },
  modalBody: {
    flex: 1,
  },
  
  // ============ BUTTON STYLES ============
  primaryButton: {
    backgroundColor: '#3A8AFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});