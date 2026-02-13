import { colors } from '@/styles/colors';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AIHeader from './components/AiHeader';
import InputBar from './components/InputBar';
import MessageList, { Message } from './components/MessageList';

const QUICK_REPLIES = ['Tôi cần hỗ trợ', 'Tính năng mới?', 'Báo lỗi'];
const TAB_BAR_HEIGHT = Platform.select({ ios: 84, android: 68 }) ?? 68;

const AIChatScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [messages, setMessages] = useState<Message[]>([{
    id: '0',
    text: 'Xin chào! Tôi là trợ lý AI, sẵn sàng hỗ trợ bạn 24/7. Hãy hỏi tôi bất cứ điều gì 😊',
    sender: 'ai',
    timestamp: new Date(),
  }]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);

  const handleSend = (text: string) => {
    setShowQuick(false);
    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [userMsg, ...prev]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        'Cảm ơn bạn! Tôi đang phân tích yêu cầu, vui lòng chờ một chút nhé.',
        'Câu hỏi hay đó! Để tôi tìm hiểu và trả lời bạn ngay.',
        'Tôi hiểu rồi. Đây là thông tin chi tiết bạn cần 👇',
      ];
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: replies[Math.floor(Math.random() * replies.length)],
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [aiMsg, ...prev]);
    }, 900 + Math.random() * 600);
  };

  const handleBack = () => navigation.goBack();

  const handleArchive = () => {
    console.log('Archive button pressed');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <AIHeader
        title="AI Hỗ Trợ Khách Hàng"
        onBack={handleBack}
        onArchivePress={handleArchive}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
      >
        <View style={styles.flex}>
          <MessageList
            messages={messages}
            isTyping={isTyping}
            quickReplies={showQuick ? QUICK_REPLIES : []}
            onQuickReplyPress={handleSend}
          />

          {/* 👇 extraBottomPadding = TAB_BAR_HEIGHT để tránh bị che bởi tab bar */}
          <InputBar onSend={handleSend} extraBottomPadding={0} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
});

export default AIChatScreen;