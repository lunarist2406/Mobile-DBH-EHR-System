import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import DoctorHeader from './components/DoctorHeader';
import AISearchBar from './components/AISearchBar';
import QuickActions from './components/QuickActions';
import StatisticsCards from './components/StatisticsCards';
import ConsentRequests from './components/ConsentRequests';
import UpcomingAppointments from './components/UpcomingAppointments';

const DoctorView: React.FC = () => {
  const [aiResult, setAiResult] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <DoctorHeader />

        <View style={styles.body}>
          <AISearchBar onResult={setAiResult} aiResult={aiResult} />
          <QuickActions />
          <StatisticsCards />
          <ConsentRequests />
          <UpcomingAppointments />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorView;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#7583b3',
  },
  content: {
    paddingBottom: 96,
  },
  body: {
    paddingHorizontal: 24,
    paddingTop: 16,   // 👈 đẩy nội dung xuống nhẹ, rất quan trọng
  },
});
