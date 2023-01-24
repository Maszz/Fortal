import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {Config} from '../../env';
import {Mutation} from '../../graphql/graphql';
import {mutate} from '../action/userAction';
export interface CreateEventDto {
  startDateTime: string;
  endDateTime: string;
  memberLimit: string;
  memberType: string;
  isPublic: boolean;
  eventColors: string[];
  eventName: string;
  eventDescription: string;
  location: {
    latitudeDelta: number;
    longitudeDelta: number;
    latitude: number;
    longitude: number;
  };
  locationName: string;
  locationDescription: string;
  locationMarker: {
    latitude: number;
    longitude: number;
  };
  creatorUsername: string;
}
export interface CreateEventResponse {
  event: Event;
  eventChat: EventChat;
}

export interface Event {
  createdAt: string;
  creatorId: string;
  description: string;
  endDate: string;
  eventColors: EventColors;
  id: string;
  isPublic: boolean;
  location: Location;
  locationDetails: string;
  locationMarker: LocationMarker;
  locationName: string;
  memberLimit: number;
  memberType: string;
  name: string;
  participantsId: any[];
  startDate: string;
  updatedAt: string;
}

export interface EventColors {
  c1: string;
  c2: string;
}

export interface Location {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}

export interface LocationMarker {
  latitude: number;
  longitude: number;
}

export interface EventChat {
  eventId: string;
  id: string;
  updatedAt: string;
}
export interface GetEventResponse {
  id: string;
  name: string;
  description: string;
  startDate: string;
  eventColors: EventColors;
  eventChat: {
    id: string;
  };
  participants: Array<{
    profile: {
      avatar: string;
    };
  }>;
  creator: {
    profile: {
      avatar: string;
    };
  };
}
export interface GetEventByIdResponse {
  createdAt: string;
  creatorId: string;
  description: string;
  endDate: string;
  eventColors: EventColors;
  id: string;
  isPublic: boolean;
  location: Location;
  locationDetails: string;
  locationMarker: LocationMarker;
  locationName: string;
  memberLimit: number;
  memberType: string;
  name: string;
  participantsId: Array<any>;
  startDate: string;
  updatedAt: string;
  eventChat: {
    id: string;
  };
  participants: Array<{
    profile: {
      avatar: string;
    };
  }>;
  creator: {
    profile: {
      avatar: string;
    };
  };
}
export type EventListType = 'created' | 'joined' | 'home';
export interface getEventListPayload {
  offset: number;
  limit: number;
  u: string;
  t: EventListType;
}

export interface JoinedEventPayload {
  eventId: string;
  userName: string;
}
export interface CreatePostPayload {
  eventId: string;
  content: string;
  creatorUsername: string;
}
export interface GetPostListPayload {
  eventId: string;
  offset: number;
  limit: number;
}

export interface GetPostListResponse {
  id: string;
  content: string;
  creator: string;
  createdAt: Date;
}

export interface GetCommentListPayload {
  offset: number;
  limit: number;
  postId: string;
}
export interface GetCommentListResponse {
  id: string;
  content: string;
  creator: string;
  createdAt: Date;
}
export interface CreateCommentPayload {
  postId: string;
  content: string;
  creatorUsername: string;
}

export interface GetPinedPostPayload {
  eventId: string;
}
export interface GetPinedPostResponse {
  creator: {
    username: string;
  };
  EventPinedPost: {
    id: string;
    createdAt: Date;
    content: string;
  };
}
export interface CreatePinedPostPayload {
  eventId: string;
  creatorUsername: string;
  content: string;
}
export interface removeParticipantPayload {
  eventId: string;
  username: string;
}

export interface GetEventMembersByIdPayload {
  eventId: string;
}

export interface GetEventMembersByIdResponse {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  displayName: string;
}

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({baseUrl: `${Config.apiBaseUrl}/event/`}),
  endpoints: builder => ({
    createEvent: builder.mutation<CreateEventResponse, CreateEventDto>({
      query: eventData => {
        return {
          url: 'createEvent',
          method: 'POST',
          body: {
            eventName: eventData.eventName,
            eventDescription: eventData.eventDescription,
            startDateTime: eventData.startDateTime,
            endDateTime: eventData.endDateTime,
            memberType: eventData.memberType,
            memberLimit: parseInt(eventData.memberLimit),
            isPublic: eventData.isPublic,
            eventColors: eventData.eventColors,
            location: eventData.location,
            locationName: eventData.locationName,
            locationDescription: eventData.locationDescription,
            locationMarker: eventData.locationMarker,
            creatorUsername: eventData.creatorUsername,
          },
        };
      },
    }),
    getEventList: builder.query<GetEventResponse[], getEventListPayload>({
      query: params => {
        return {
          url: 'getEventList',
          params: {
            offset: params.offset,
            limit: params.limit,
            u: params.u,
            t: params.t,
          },
        };
      },
    }),

    getEventById: builder.query<GetEventByIdResponse, string>({
      query: eventId => {
        return {
          url: 'getEventById',
          params: {id: eventId},
        };
      },
    }),
    joinedEvent: builder.mutation<GetEventByIdResponse, JoinedEventPayload>({
      query: params => {
        return {
          url: 'addParticipant',
          method: 'POST',
          body: {eventId: params.eventId, username: params.userName},
        };
      },
    }),
    createPost: builder.mutation<any, CreatePostPayload>({
      query: params => {
        return {
          url: 'createPost',
          method: 'POST',
          body: {
            eventId: params.eventId,
            content: params.content,
            creatorUsername: params.creatorUsername,
          },
        };
      },
    }),
    getPostList: builder.query<GetPostListResponse[], GetPostListPayload>({
      query: params => {
        return {
          url: 'getEventPostList',
          params: {
            eventId: params.eventId,
            offset: params.offset,
            limit: params.limit,
          },
        };
      },
    }),
    getCommentList: builder.query<
      GetCommentListResponse[],
      GetCommentListPayload
    >({
      query: params => {
        return {
          url: 'getCommentList',
          params: {
            offset: params.offset,
            limit: params.limit,
            postId: params.postId,
          },
        };
      },
    }),
    createComment: builder.mutation<any, CreateCommentPayload>({
      query: params => {
        return {
          url: 'createComment',
          method: 'POST',
          body: {
            postId: params.postId,
            content: params.content,
            creatorUsername: params.creatorUsername,
          },
        };
      },
    }),
    getPinedPost: builder.query<GetPinedPostResponse, GetPinedPostPayload>({
      query: params => {
        return {
          method: 'GET',
          url: 'getEventPinedPost',
          params: {
            eventId: params.eventId,
          },
        };
      },
    }),
    createPinPost: builder.mutation<any, CreatePinedPostPayload>({
      query: params => {
        return {
          url: 'createPinPost',
          method: 'POST',
          body: {
            eventId: params.eventId,
            creatorUsername: params.creatorUsername,
            content: params.content,
          },
        };
      },
    }),
    removeParticipant: builder.mutation<any, removeParticipantPayload>({
      query: params => {
        return {
          url: 'removeParticipant',
          method: 'POST',
          body: {
            eventId: params.eventId,
            username: params.username,
          },
        };
      },
    }),
    getEventMemberById: builder.query<
      GetEventMembersByIdResponse[],
      GetEventMembersByIdPayload
    >({
      query: params => {
        return {
          url: 'getEventMemberById',
          params: {id: params.eventId},
        };
      },
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetEventListQuery,
  useLazyGetEventListQuery,
  useGetEventByIdQuery,
  useJoinedEventMutation,
  // useGetEventUserListQuery,
  // useLazyGetEventUserListQuery,
  useGetPostListQuery,
  useCreatePostMutation,
  useGetCommentListQuery,
  useCreateCommentMutation,
  useGetPinedPostQuery,
  useCreatePinPostMutation,
  useRemoveParticipantMutation,
  useGetEventMemberByIdQuery,
} = eventApi;
