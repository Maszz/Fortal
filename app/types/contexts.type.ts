import React, {createContext, FunctionComponent} from 'react';

export interface User {
  id: string;
  username: string;
  onboarding: boolean;
  at: string;
  rt: string;
}
export interface DeviceInfo {
  deviceId: string;
  Platform: string;
  manufacturer: string;
}
export interface LoginResponseDto {
  access_token?: string;
  refresh_token?: string;
  userId?: string;
  onboarding?: boolean;
  error?: string;
  message?: string | string[];
  statusCode?: number;
}
export interface RegisterFormInput {
  name: string;
  email: string;
  password: string;
  username: string;
}
export interface AuthContextData {
  user: User;
  login: (username: string, password: string) => Promise<boolean | undefined>;
  logout: () => Promise<void>;
  loading: boolean;
  register: ({name, email, password, username}: RegisterFormInput) => Promise<{
    msg: boolean;
    error?: string | undefined;
  }>;
  updateOnboarding: (onboard: boolean) => Promise<void>;
  updateOnboardingGender: (gender: string) => Promise<void>;
  isMount: boolean;
  updateUserInterestedTags: (tags: string[]) => Promise<void>;
}
