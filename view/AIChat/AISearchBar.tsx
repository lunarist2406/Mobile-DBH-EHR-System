import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Search, Sparkles } from 'lucide-react-native';

type Props = {
  onSearch: (query: string) => Promise<string>;
};

export default function AISearchBar({ onSearch }: Props) {
  const [q, setQ] = useState('');
  const [res, setRes] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!q.trim()) return;

    setLoading(true);
    setRes(null);

    try {
      const result = await onSearch(q);
      setRes(result);
    } catch {
      setRes('Có lỗi xảy ra khi truy vấn AI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Sparkles size={20} color="#4F46E5" />
        <Text style={styles.title}>Trợ lý AI Y khoa</Text>
      </View>
      
      <Text style={styles.subtitle}>
        Tìm kiếm hồ sơ bệnh án, kết quả xét nghiệm, kiểm tra tính toàn vẹn dữ liệu
      </Text>
      
      <View style={styles.searchContainer}>
        <Search size={18} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          placeholder="Nhập câu hỏi về HSBÀ, xét nghiệm, tính toàn vẹn..."
          placeholderTextColor="#94A3B8"
          value={q}
          onChangeText={setQ}
          style={styles.input}
          onSubmitEditing={run}
          returnKeyType="search"
        />
      </View>

      <TouchableOpacity
        onPress={run}
        disabled={loading || !q.trim()}
        style={[
          styles.button,
          (!q.trim() || loading) && styles.buttonDisabled,
        ]}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <>
            <Sparkles size={16} color="#FFFFFF" />
            <Text style={styles.buttonText}>Tìm kiếm với AI</Text>
          </>
        )}
      </TouchableOpacity>

      {res && (
        <View style={styles.resultContainer}>
          <View style={styles.resultHeader}>
            <Sparkles size={14} color="#4F46E5" />
            <Text style={styles.resultTitle}>Kết quả từ AI:</Text>
          </View>
          <Text style={styles.resultText}>{res}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000D28',
  },
  
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 16,
    lineHeight: 18,
  },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  
  searchIcon: {
    marginRight: 8,
  },
  
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: '#000D28',
    fontWeight: '500',
  },
  
  button: {
    flexDirection: 'row',
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  
  buttonDisabled: {
    backgroundColor: '#CBD5E1',
    shadowOpacity: 0,
    elevation: 0,
  },
  
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.3,
  },
  
  resultContainer: {
    marginTop: 16,
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#4F46E5',
  },
  
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  
  resultTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4F46E5',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  resultText: {
    fontSize: 14,
    color: '#1E293B',
    lineHeight: 20,
  },
});