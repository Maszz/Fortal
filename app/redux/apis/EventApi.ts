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
    getEventList: builder.query<
      GetEventResponse[],
      {offset: number; limit: number; u: string}
    >({
      query: params => {
        return {
          url: 'getEventList',
          params: {offset: params.offset, limit: params.limit, u: params.u},
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
  }),
});

export const {
  useCreateEventMutation,
  useGetEventListQuery,
  useLazyGetEventListQuery,
  useGetEventByIdQuery,
  useJoinedEventMutation,
} = eventApi;
