import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7271/api",
  }),
  tagTypes: ["books"],
  endpoints: (builder) => {
    return {
      getAllBooks: builder.query({
        query: () => {
          return "/books";
        },
        providesTags: ["books"],
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
        invalidatesTags: ["books"],
      }),
      editBook: builder.mutation({
        query: ({ id, ...patch }) => {
          return {
            url: `/book/${id}`,
            method: "PATCH",
            body: patch.patch,
          };
        },
        invalidatesTags: ["books"],
      }),
    };
  },
});
export const {
  useGetAllBooksQuery,
  useLazyGetBookByIdQuery,
  useDeleteBookMutation,
  useEditBookMutation,
} = booksApi;
