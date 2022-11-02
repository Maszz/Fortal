import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface QueryItem {
  content: string;
  type: string;
  id?: string;
}
export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3333/'}),
  keepUnusedDataFor: 10,
  refetchOnMountOrArgChange: 10,

  endpoints: builder => ({
    getSearchItem: builder.query<QueryItem[], string>({
      query: name => {
        return {url: `search/keyword`, params: {term: name}};
      },
    }),
    getSearchItemContext: builder.query<any, QueryItem>({
      query: context => {
        if (context.type === 'user') {
          return {url: `user/${context.content}`};
        } else {
          return {url: `event/getEvent/${context.id}`};
        }
      },
    }),
  }),
});

export const {useGetSearchItemQuery, useGetSearchItemContextQuery} = searchApi;
