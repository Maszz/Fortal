import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Config} from '../../env';
export interface QueryItem {
  content: string;
  type: string;
  id?: string;
}
export interface SearchResponse {
  content: string;
  type: string;
  id: string;
  displayName?: string;
  bio?: string;
  date?: string;
  location?: string;
  avarar?: string;
}
export interface UserProfileResponse {
  username: string;
  profile?: {
    realName?: string;
    bio?: string;
    displayName?: string;
    isProfilePublic?: boolean;
    eventCount?: number;
    avarar: string;
  };
  categories: string[];
  _count: {
    followedBy: number;
    following: number;
  };
}

export interface LocationSearchResponse {
  geometry: {
    lat: number;
    lng: number;
  };
  place: string;
  flag: string;
}

export interface getUserByUserNameResponse {}
export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({baseUrl: `${Config.apiBaseUrl}/`}),
  keepUnusedDataFor: 10,
  refetchOnMountOrArgChange: 10,

  endpoints: builder => ({
    getSearchItem: builder.query<SearchResponse[], {term: string; u: string}>({
      query: params => {
        return {
          url: `search/keyword`,
          params: {term: params.term, u: params.u},
        };
      },
    }),
    getSearchItemUserByUsername: builder.mutation<UserProfileResponse, string>({
      query: username => {
        return {
          url: `user/getUserByUsername`,
          method: 'GET',
          params: {username: username},
        };
      },
    }),
    getSearchItemEvent: builder.query<any, string>({
      query: id => {
        return {url: `event/getEvent/${id}`};
      },
    }),
    getSearchLocationEvent: builder.query<LocationSearchResponse[], string>({
      query: location => {
        return {url: `search/location`, params: {term: location}};
      },
    }),
  }),
});

export const {
  useGetSearchItemQuery,
  useGetSearchItemEventQuery,
  useGetSearchItemUserByUsernameMutation,
  useLazyGetSearchItemQuery,
  useGetSearchLocationEventQuery,
} = searchApi;
