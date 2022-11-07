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
export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({baseUrl: `${Config.apiBaseUrl}/event/`}),
  endpoints: builder => ({
    createEvent: builder.mutation<any, CreateEventDto>({
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
  }),
});

export const {useCreateEventMutation} = eventApi;
