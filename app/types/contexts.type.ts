import React, {createContext, FunctionComponent} from 'react';

export interface User {
  username: string;
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
  error?: string;
  message?: string;
  statusCode?: number;
}
export interface AuthContextData {
  user: User;
  login: (username: string, password: string) => Promise<boolean | undefined>;
  logout: () => Promise<void>;
  loading: boolean;
}
