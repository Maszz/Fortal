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
  }),
});

export const {
  useUpdateOnboardingGenderMutation,
  useUpdateUserInterestedTagsMutation,
  useUpdateOnboardingMutation,
} = userApi;
