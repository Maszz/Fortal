import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {Config} from '../../env';
export const tagsApi = createApi({
  reducerPath: 'tagsApi',
  baseQuery: fetchBaseQuery({baseUrl: `${Config.apiBaseUrl}/tags/`}),
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
