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
  name?: string;
  bio?: string;
  date?: string;
  location?: string;
}
export interface UserProfileResponse {
  username: string;
  profile?: {
    name?: string;
    surname?: string;
    bio?: string;
  };
  categories: string[];
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
    getSearchItem: builder.query<SearchResponse[], string>({
      query: name => {
        return {url: `search/keyword`, params: {term: name}};
      },
    }),
    getSearchItemUserByUsername: builder.query<UserProfileResponse, string>({
      query: username => {
        return {url: `user/${username}`};
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
  useGetSearchItemUserByUsernameQuery,
  useLazyGetSearchItemQuery,
  useGetSearchLocationEventQuery,
} = searchApi;
