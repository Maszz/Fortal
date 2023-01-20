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
    isProfilePublic?: boolean;
    colors?: {
      c1?: string;
      c2?: string;
    };
  };
  newTags: string[];
  removeTags: string[];
}
export interface UpdateProfileResponseDto {
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
export interface GetFollowerResponse {
  id: string;
  username: string;
  displayName: string;
  bio: string;
}
export interface CountRes {
  followedBy: number;
  following: number;
  followingRequestBy: number;
}

export interface FollowingByIdPayload {
  userId: string;
  followingUserId: string;
}
export interface FollowingRequestPayload {
  followerId: string;
  followingId: string;
}

export interface FollowingRequestFromResponse {
  username: string;
  displayName: string;
  id: string;
}
export interface HandleFollowingRequestPayload {
  requestId: string;
  status: string;
}
export interface unFollowingByIdPayload {
  followerId: string;
  unfollowingId: string;
}
export interface removeFollowerByIdPayload {
  userId: string;
  followerId: string;
}
export interface getNotificationsResponse {
  creator: {
    username: string;
  };
  message: string;
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

    getFollowers: builder.mutation<GetFollowerResponse[], string>({
      query: username => ({
        url: `followers`,
        method: 'GET',
        params: {u: username},
      }),
    }),
    getFollowing: builder.mutation<GetFollowerResponse[], string>({
      query: username => ({
        url: `following`,
        method: 'GET',
        params: {u: username},
      }),
    }),
    followingByid: builder.mutation<any, FollowingByIdPayload>({
      query: body => ({
        url: `followingUserByid`,
        method: 'POST',
        body: {userId: body.userId, followingUserId: body.followingUserId},
      }),
    }),
    getFollowCount: builder.mutation<CountRes, string>({
      query: username => ({
        url: `followCount`,
        method: 'GET',
        params: {u: username},
      }),
    }),
    followingRequest: builder.mutation<any, FollowingRequestPayload>({
      query: body => ({
        url: `followingRequest`,
        method: 'POST',
        body: {followerId: body.followerId, followingId: body.followingId},
      }),
    }),
    getFollowingRequestTo: builder.mutation<any, string>({
      query: username => ({
        url: `getFollowingRequestTo`,
        method: 'GET',
        params: {u: username},
      }),
    }),
    getFollowingRequestFrom: builder.mutation<
      FollowingRequestFromResponse[],
      string
    >({
      query: username => ({
        url: `getFollowingRequestFrom`,
        method: 'GET',
        params: {u: username},
      }),
    }),
    handleFollowingRequest: builder.mutation<
      any,
      HandleFollowingRequestPayload
    >({
      query: body => ({
        url: `handleFollowingRequest`,
        method: 'POST',
        body: {requestId: body.requestId, status: body.status},
      }),
    }),

    unFollowingById: builder.mutation<any, unFollowingByIdPayload>({
      query: body => ({
        url: `unFollowingById`,
        method: 'POST',
        body: {followerId: body.followerId, unfollowingId: body.unfollowingId},
      }),
    }),
    removeFollowerById: builder.mutation<any, removeFollowerByIdPayload>({
      query: body => ({
        url: `removeFollowerById`,
        method: 'POST',
        body: {userId: body.userId, followerId: body.followerId},
      }),
    }),
    getNotifications: builder.mutation<getNotificationsResponse[], string>({
      query: username => ({
        url: `getNotifications`,
        method: 'GET',
        params: {u: username},
      }),
    }),
    getUserAvatar: builder.query<{avatar: string}, string>({
      query: username => ({
        url: `getAvatar`,
        method: 'GET',
        params: {u: username},
      }),
    }),
  }),
});

export const {
  useUpdateOnboardingGenderMutation,
  useUpdateUserInterestedTagsMutation,
  useUpdateOnboardingMutation,
  useUpdateUserProfileMutation,
  useGetFollowersMutation,
  useGetFollowingMutation,
  useFollowingByidMutation,
  useGetFollowCountMutation,
  useGetFollowingRequestToMutation,
  useGetFollowingRequestFromMutation,
  useHandleFollowingRequestMutation,
  useUnFollowingByIdMutation,
  useRemoveFollowerByIdMutation,
  useGetNotificationsMutation,
  useGetUserAvatarQuery,
  useLazyGetUserAvatarQuery,
} = userApi;
