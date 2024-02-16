import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7271/api",
  }),
  endpoints: (builder) => {
    return {
      getAllBooks: builder.query({
        query: () => "/books",
      }),
      getBookById: builder.query({
        query: (id) => `/book/${id}`,
      }),
      deleteBook: builder.mutation({
        query: (id) => {
          console.log(id);
          return {
            url: `/book/${id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});
export const {
  useGetAllBooksQuery,
  useLazyGetBookByIdQuery,
  useDeleteBookMutation,
} = booksApi;
