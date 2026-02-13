// components/InputBar.tsx
import { colors } from '@/styles/colors';
import { ArrowUp, Mic, Paperclip } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface InputBarProps {
  onSend: (text: string) => void;
  /**
   * Padding bottom thêm vào khi bàn phím đóng,
   * để input không bị tab bar (position: absolute) che mất.
   * Truyền vào TAB_BAR_HEIGHT từ màn hình cha.
   */
  extraBottomPadding?: number;
}

const InputBar: React.FC<InputBarProps> = ({ onSend, extraBottomPadding = 0 }) => {
  const [inputText, setInputText] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const focusAnim = useRef(new Animated.Value(0)).current;
  const hasText = inputText.trim().length > 0;

  const handleFocus = () => {
    setKeyboardOpen(true);
    Animated.timing(focusAnim, { toValue: 1, duration: 180, useNativeDriver: false }).start();
  };

  const handleBlur = () => {
    setKeyboardOpen(false);
    Animated.timing(focusAnim, { toValue: 0, duration: 180, useNativeDriver: false }).start();
  };

  const handleSend = () => {
    if (!hasText) return;
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.86, duration: 70, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 4, tension: 220, useNativeDriver: true }),
    ]).start();
    onSend(inputText.trim());
    setInputText('');
  };

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border, 'rgba(0,122,255,0.45)'],
  });

  const shadowOpacity = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.12],
  });

  /**
   * ✅ KEY FIX:
   * - Bàn phím ĐÓNG → thêm extraBottomPadding để tránh tab bar che
   * - Bàn phím MỞ  → paddingBottom = 0 (KAV + tabBarHideOnKeyboard đã xử lý)
   */
  const wrapperPaddingBottom = keyboardOpen ? 0 : extraBottomPadding;

  return (
    <View style={[styles.wrapper, { paddingBottom: wrapperPaddingBottom + 10 }]}>
      <Animated.View style={[styles.container, { borderColor, shadowOpacity }]}>
        {/* Attach */}
        <TouchableOpacity style={styles.sideBtn} activeOpacity={0.6}>
          <Paperclip size={17} color="#C0C0C8" strokeWidth={1.7} />
        </TouchableOpacity>

        {/* Input */}
        <TextInput
          style={styles.input}
          placeholder="Nhắn tin với AI..."
          placeholderTextColor="#C0C0C8"
          value={inputText}
          onChangeText={setInputText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline
          maxLength={4000}
        />

        {/* Send / Mic */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[styles.sendButton, hasText ? styles.sendActive : styles.sendIdle]}
            onPress={handleSend}
            activeOpacity={0.8}
          >
            {hasText
              ? <ArrowUp size={17} color="#FFF" strokeWidth={2.8} />
              : <Mic size={17} color="#AEAEB2" strokeWidth={1.7} />
            }
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingHorizontal: 14,
    paddingTop: 10,
    // paddingBottom được set động ở trên
  },

  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F7F8FA',
    borderRadius: 26,
    borderWidth: 1.5,
    paddingHorizontal: 4,
    paddingVertical: 4,
    gap: 2,
    shadowColor: colors.primaryBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 0,
  },

  sideBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: Platform.select({ ios: 8, android: 7 }),
    fontSize: 15,
    color: colors.textDark,
    maxHeight: 120,
    lineHeight: 21,
    letterSpacing: 0.1,
  },

  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendActive: {
    backgroundColor: colors.primaryBlue,
    shadowColor: colors.primaryBlue,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  sendIdle: {
    backgroundColor: '#EBEBED',
  },
});

export default InputBar;