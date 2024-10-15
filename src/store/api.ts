

import { User } from '@/types/Error';
import { Card } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    getContacts: builder.query<Card[],{}>({
      query: () => '/cards',
       providesTags: (result) => result ? result.map(({ id }) => ({ type: 'Contact', id })) : ['Contact'],
      // providesTags: ['Contact'],
    }),

    addContact: builder.mutation({
      query: (newContact) => ({
        url: '/card',
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: ['Contact'],
    }),

    updateContact: builder.mutation({
      query: ({ contactId, updatedContact }) => ({
        url: `/card?id=${contactId}`,
        method: 'PUT',
        body: updatedContact,
      }),
        invalidatesTags: (result, error, { id }) => [{ type: 'Contact', id }],

      // invalidatesTags: ['Contact'],
    }),

    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `/card?id=${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Contact', id }],

      // invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;
