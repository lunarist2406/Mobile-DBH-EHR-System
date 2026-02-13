import { ReactNode } from 'react';

// Phản ánh đúng bảng `users` và `roles`
export interface UserProfile {
  userId: string;          // user_id
  fullName: string;       // full_name
  email: string;
  phone: string;
  roleName: string;       // từ bảng roles
  status: 'active' | 'inactive' | 'locked'; // user_status_t
  createdAt: string;      // timestamp
}

export interface SettingsItem {
  icon: ReactNode;
  title: string;
  subtitle: string;
  type: 'navigate' | 'toggle';
  value?: boolean;
  onValueChange?: (value: boolean) => void;
}

export interface SettingsSection {
  title: string;
  items: SettingsItem[];
}