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
}
export type EventListType = 'created' | 'joined' | 'home';
export interface getEventListPayload {
  offset: number;
  limit: number;
  u: string;
  t: EventListType;
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
    // getEventUserList: builder.query<
    //   GetEventResponse[],
    //   getEventUserListPayload
    // >({
    //   query: params => {
    //     return {
    //       url: 'getEventUserList',
    //       params: {
    //         offset: params.offset,
    //         limit: params.limit,
    //         u: params.u,
    //         t: params.t,
    //       },
    //     };
    //   },
    // }),

    getEventById: builder.query<GetEventByIdResponse, string>({
      query: eventId => {
        return {
          url: 'getEventById',
          params: {id: eventId},
        };
      },
    }),
    joinedEvent: builder.mutation<
      GetEventByIdResponse,
      {eventId: string; userName: string}
    >({
      query: params => {
        return {
          url: 'addParticipant',
          method: 'POST',
          body: {eventId: params.eventId, username: params.userName},
        };
      },
    }),
    createPost: builder.mutation<
      any,
      {
        eventId: string;
        content: string;
        creatorUsername: string;
      }
    >({
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
    getPostList: builder.query<
      {
        id: string;
        content: string;
        creator: string;
        createdAt: Date;
      }[],
      {eventId: string; offset: number; limit: number}
    >({
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
} = eventApi;
