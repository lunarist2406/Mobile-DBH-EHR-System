import { ChevronLeft } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

interface Props {
  title: string;
  subtitle: string;
  onBack?: () => void;
}

const AuthHeader = ({ title, subtitle, onBack }: Props) => (
  <View style={{ marginBottom: 32 }}>
    {onBack && (
      <Pressable 
        onPress={onBack} 
        style={{
          marginBottom: 24,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F3F4F6',
          borderRadius: 12,
        }}
      >
        <ChevronLeft size={20} color="#000D28" />
      </Pressable>
    )}
    <Text style={{
      fontSize: 28,
      fontWeight: '800',
      color: '#000D28',
      marginBottom: 8,
      letterSpacing: -0.5,
    }}>
      {title}
    </Text>
    <Text style={{
      fontSize: 15,
      color: '#6B7280',
      lineHeight: 22,
    }}>
      {subtitle}
    </Text>
  </View>
);

export default AuthHeader;