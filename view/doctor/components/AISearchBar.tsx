import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Search } from 'lucide-react-native';

interface Props {
  onResult: (value: string | null) => void;
  aiResult: string | null;
}

export default function AISearchBar({ onResult, aiResult }: Props) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;

    setLoading(true);
    onResult(null);

    // ⏳ MOCK SEARCH (chưa có service)
    setTimeout(() => {
      onResult(
        'AI Insight (mock): Patient data reviewed. No critical abnormalities detected.'
      );
      setLoading(false);
    }, 1200);
  };

  return (
    <View style={{ marginTop: 24 }}>
      {/* Search box */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#2563eb',
          borderRadius: 16,
          paddingHorizontal: 12,
          paddingVertical: 10,
        }}
      >
        <Search size={20} color="#e0f2fe" />

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="AI search patient records…"
          placeholderTextColor="#dbeafe"
          style={{
            flex: 1,
            marginHorizontal: 10,
            color: 'white',
            fontSize: 14,
          }}
        />

        <Pressable
          onPress={handleSearch}
          disabled={loading}
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 10,
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#2563eb" />
          ) : (
            <Text
              style={{
                color: '#2563eb',
                fontWeight: '700',
                fontSize: 12,
              }}
            >
              Ask AI
            </Text>
          )}
        </Pressable>
      </View>

      {/* Result */}
      {aiResult && (
        <View
          style={{
            marginTop: 14,
            padding: 14,
            backgroundColor: '#eff6ff',
            borderRadius: 14,
          }}
        >
          <Text style={{ fontSize: 13, lineHeight: 18 }}>{aiResult}</Text>

          <Pressable onPress={() => onResult(null)}>
            <Text
              style={{
                marginTop: 10,
                fontSize: 11,
                color: '#2563eb',
                textDecorationLine: 'underline',
              }}
            >
              Dismiss
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
