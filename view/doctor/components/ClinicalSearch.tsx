import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Search } from 'lucide-react-native';

export default function ClinicalSearch() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const mockSearch = () => {
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);

    // ⏳ fake delay
    setTimeout(() => {
      setResult(
        'AI Insight (mock): Patient shows stable vitals. Consider routine follow-up and monitor HbA1c trends.'
      );
      setLoading(false);
    }, 1200);
  };

  return (
    <View style={{ marginTop: 24 }}>
      {/* Search Box */}
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
          placeholder="AI clinical search (mock)…"
          placeholderTextColor="#dbeafe"
          style={{
            flex: 1,
            marginHorizontal: 10,
            color: 'white',
            fontSize: 14,
          }}
        />

        <Pressable
          onPress={mockSearch}
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
      {result && (
        <View
          style={{
            marginTop: 14,
            backgroundColor: '#eff6ff',
            borderRadius: 14,
            padding: 14,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                backgroundColor: '#22c55e',
              }}
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: '#1e3a8a',
              }}
            >
              AI Insight
            </Text>
          </View>

          <Text
            style={{
              marginTop: 8,
              fontSize: 13,
              lineHeight: 18,
              color: '#0f172a',
            }}
          >
            {result}
          </Text>

          <Pressable onPress={() => setResult(null)}>
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
