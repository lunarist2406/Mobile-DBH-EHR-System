import { Sparkles } from 'lucide-react-native';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FloatingAIButtonProps {
  onPress: () => void;
}

export default function FloatingAIButton({ onPress }: FloatingAIButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.btn} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconWrapper}>
        <Sparkles size={26} color="#FFFFFF" fill="#FFFFFF" />
      </View>
      <Text style={styles.text}>AI</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: '#3A8AFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: '#3A8AFF',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
      },
      android: {
        elevation: 10,
      },
    }),
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconWrapper: {
    marginRight: 6,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});