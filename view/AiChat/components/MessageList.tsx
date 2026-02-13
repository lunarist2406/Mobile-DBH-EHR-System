import { colors } from '@/styles/colors';
import React, { useEffect, useRef } from 'react';
import { Animated, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 🔧 Đặt icon vào: assets/icons/
const AI_ICON = Platform.OS === 'ios'
  ? require('../../../assets/images/ai_apple-touch-icon.png')
  : require('../../../assets/images/ai_android-chrome-192x192.png');

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp?: Date;
};

interface MessageListProps {
  messages: Message[];
  isTyping?: boolean;
  quickReplies?: string[];
  onQuickReplyPress?: (text: string) => void;
}

const MessageBubble: React.FC<{ item: Message }> = ({ item }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 7, tension: 130, useNativeDriver: true }),
    ]).start();
  }, []);

  const isUser = item.sender === 'user';
  const time = item.timestamp
    ? item.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <Animated.View
      style={[
        styles.row,
        isUser ? styles.userRow : styles.aiRow,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {!isUser && (
        <View style={styles.aiAvatar}>
          <Image source={AI_ICON} style={styles.aiAvatarImage} resizeMode="contain" />
        </View>
      )}

      <View style={styles.col}>
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
          <Text style={isUser ? styles.userText : styles.aiText}>{item.text}</Text>
        </View>
        {!!time && <Text style={[styles.ts, isUser ? styles.tsUser : styles.tsAi]}>{time}</Text>}
      </View>

      {isUser && <View style={styles.userAvatar} />}
    </Animated.View>
  );
};

const TypingIndicator: React.FC = () => {
  const dots = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const anims = dots.map((dot, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 160),
          Animated.timing(dot, { toValue: -5, duration: 280, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 280, useNativeDriver: true }),
          Animated.delay(600),
        ])
      )
    );
    anims.forEach(a => a.start());
    return () => anims.forEach(a => a.stop());
  }, []);

  return (
    <View style={[styles.row, styles.aiRow]}>
      <View style={styles.aiAvatar}>
        <Image source={AI_ICON} style={styles.aiAvatarImage} resizeMode="contain" />
      </View>
      <View style={[styles.bubble, styles.aiBubble, styles.typingBubble]}>
        {dots.map((dot, i) => (
          <Animated.View key={i} style={[styles.typingDot, { transform: [{ translateY: dot }] }]} />
        ))}
      </View>
    </View>
  );
};

const QuickReplies: React.FC<{ items: string[]; onPress: (text: string) => void }> = ({ items, onPress }) => {
  if (!items.length) return null;
  return (
    <View style={styles.quickContainer}>
      <Text style={styles.quickTitle}>Gợi ý nhanh:</Text>
      <View style={styles.quickGrid}>
        {items.map((text, idx) => (
          <TouchableOpacity key={idx} style={styles.quickChip} onPress={() => onPress(text)} activeOpacity={0.7}>
            <Text style={styles.quickChipText}>{text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const MessageList: React.FC<MessageListProps> = ({
  messages,
  isTyping = false,
  quickReplies = [],
  onQuickReplyPress,
}) => {
  const data = quickReplies.length > 0 ? [{ id: 'quick-replies', type: 'quick' }, ...messages] : messages;

  const renderItem = ({ item }: { item: Message | { id: string; type: string } }) => {
    if ('type' in item && item.type === 'quick') {
      return <QuickReplies items={quickReplies} onPress={(text) => onQuickReplyPress?.(text)} />;
    }
    return <MessageBubble item={item as Message} />;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      inverted
      ListHeaderComponent={isTyping ? <TypingIndicator /> : null}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,          // 👈 giảm từ 18 xuống 8 – không còn khoảng trống lớn
    gap: 4,                      // 👈 giảm gap giữa các tin nhắn
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 2,
  },
  userRow: { justifyContent: 'flex-end' },
  aiRow: { justifyContent: 'flex-start' },

  aiAvatar: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: colors.lightBlue,
    borderWidth: 1,
    borderColor: 'rgba(0,122,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  aiAvatarImage: { width: 22, height: 22, borderRadius: 4 },

  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: colors.primaryBlue,
    flexShrink: 0,
    shadowColor: colors.primaryBlue,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },

  col: { maxWidth: '72%', gap: 3 },

  bubble: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18 },
  userBubble: {
    backgroundColor: colors.primaryBlue,
    borderBottomRightRadius: 4,
    shadowColor: colors.primaryBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  aiBubble: {
    backgroundColor: colors.secondaryBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: 4,
  },

  userText: { color: colors.textLight, fontSize: 15, lineHeight: 22 },
  aiText: { color: colors.textDark, fontSize: 15, lineHeight: 22 },

  ts: { fontSize: 10, color: '#C7C7CC', letterSpacing: 0.3 },
  tsUser: { textAlign: 'right', paddingRight: 2 },
  tsAi: { textAlign: 'left', paddingLeft: 2 },

  typingBubble: {
    flexDirection: 'row',
    gap: 5,
    paddingVertical: 14,
    alignItems: 'center',
  },
  typingDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#C7C7CC' },

  quickContainer: {
    backgroundColor: colors.background,
    paddingVertical: 12,          // 👈 giảm từ 16 xuống 12
    paddingHorizontal: 12,
    borderRadius: 24,
    marginVertical: 4,             // 👈 giảm từ 8 xuống 4
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaryBlue,
    marginBottom: 8,               // 👈 giảm từ 12 xuống 8
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,                        // 👈 giảm từ 10 xuống 8
  },
  quickChip: {
    backgroundColor: colors.lightBlue,
    borderWidth: 1,
    borderColor: 'rgba(0,122,255,0.2)',
    paddingHorizontal: 14,          // 👈 giảm từ 16 xuống 14
    paddingVertical: 8,             // 👈 giảm từ 10 xuống 8
    borderRadius: 30,
    shadowColor: colors.primaryBlue,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  quickChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primaryBlue,
  },
});

export default MessageList;