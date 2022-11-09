import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {Config} from '../../env';
export interface UpdateOnboardingMutationPayload {
  userId: string;
  onboarding: boolean;
}
export interface UpdateOnboardingGenderMutationPayload {
  userId: string;
  gender: string;
}
export interface UpdateUserInterestedTagsMutationPayload {
  userId: string;
  tags: string[];
}
export interface UpdateOnboardingResponseDto {
  result: boolean;
}
export interface UpdateProfileMutationPayload {
  username: string;
  cUsername: string;
  profile: {
    bio?: string;
    displayName?: string;
  };
}
export default interface UpdateProfileResponseDto {
  profile: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    email: string;
    onboarding: boolean;
    eventsJoined: string[];
    categoryIDs: string[];
  };
  updateUsername: boolean;
}
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({baseUrl: `${Config.apiBaseUrl}/user/`}),
  endpoints: builder => ({
    updateOnboarding: builder.mutation<
      UpdateOnboardingResponseDto,
      UpdateOnboardingMutationPayload
    >({
      query: body => ({
        url: 'update/onboarding',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    updateOnboardingGender: builder.mutation<
      UpdateOnboardingResponseDto,
      UpdateOnboardingGenderMutationPayload
    >({
      query: body => ({
        url: 'update/onboarding/gender',
        method: 'POST',
        body,
      }),
    }),
    updateUserInterestedTags: builder.mutation<
      UpdateOnboardingResponseDto,
      UpdateUserInterestedTagsMutationPayload
    >({
      query: body => ({
        url: 'update/tags',
        method: 'POST',
        body,
      }),
    }),
    updateUserProfile: builder.mutation<
      UpdateProfileResponseDto,
      UpdateProfileMutationPayload
    >({
      query: body => ({
        url: 'update/profile',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useUpdateOnboardingGenderMutation,
  useUpdateUserInterestedTagsMutation,
  useUpdateOnboardingMutation,
  useUpdateUserProfileMutation,
} = userApi;
