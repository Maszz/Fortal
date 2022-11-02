import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3333/tags/'}),
  endpoints: builder => ({
    getTags: builder.query<{[key: string]: boolean}, void>({
      query: () => {
        return {url: '', method: 'GET'};
      },
      transformResponse: (response: string[]) => {
        return response.reduce((accumulator, value) => {
          return {...accumulator, [value]: false};
        }, {});
      },
    }),
  }),
});

export const {useGetTagsQuery} = tagsApi;
