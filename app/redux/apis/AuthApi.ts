import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export interface SigninMutationPayload {
  username: string;
  password: string;
  deviceId: string;
  platform: string;
  manufacturer: string;
}
export interface SignupMutationPayload {
  username: string;
  password: string;
  name: string;
  email: string;
  deviceId: string;
  platform: string;
  manufacturer: string;
}
interface AccesToken {
  at: string;
}
export interface LoginResponseDto {
  access_token?: string;
  refresh_token?: string;
  userId?: string;
  onboarding?: boolean;
}
export interface ErrorResponse {
  data: {
    error: string;
    message: string | string[];
    statusCode: number;
  };
  status: number;
}
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3333/auth/'}),

  endpoints: builder => ({
    signIn: builder.mutation<LoginResponseDto, SigninMutationPayload>({
      query: body => ({
        url: 'signin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    signup: builder.mutation<LoginResponseDto, SignupMutationPayload>({
      query: body => ({
        url: 'signup',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    logout: builder.mutation<boolean, AccesToken>({
      query: body => ({
        url: 'logout',
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${body.at}`,
        },
      }),
    }),
  }),
});

export const {useSignInMutation, useSignupMutation, useLogoutMutation} =
  authApi;
