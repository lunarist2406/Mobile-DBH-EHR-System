import React from 'react';
import { View, Text } from 'react-native';

export default function StatsRow() {
  return (
    <View style={{ flexDirection: 'row', padding: 16 }}>
      <View style={{ flex: 1 }}>
        <Text>Integrity</Text>
        <Text style={{ fontSize: 22, fontWeight: '800' }}>PASS</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text>Access Today</Text>
        <Text style={{ fontSize: 22, fontWeight: '800' }}>14</Text>
      </View>
    </View>
  );
}
