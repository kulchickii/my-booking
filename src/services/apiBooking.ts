import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "./supabase";

export interface Room {
  name: string;
}

export interface Guest {
  fullName: string;
  email: string;
}

export interface Booking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numDate: number;
  numGuest: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  room: Room 
  guest: Guest
}

interface GetBookingsResponse {
  bookings: Booking[];
  count: number;
}

export const apiBooking = createApi({
  reducerPath: 'apiBooking',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['Booking'],
  endpoints: (builder) => ({
    getBookings: builder.query<GetBookingsResponse, void>({
      queryFn: async () => {
        const { data, error , count} = await supabase
          .from('bookings')
          .select(` 
            id,
            created_at,
            startDate,
            endDate,
            numDate,
            numGuest,
            status,
            totalPrice,
            room(name),
            guest(fullName, email)`,
            { count: "exact" })
        if (error) {
          return {error: {status: 404, statusText: 'Booking not found', data: error.message}}        
        }
        
        return { data: { bookings: data ?? [], count: count ?? 0 } }
      },
      providesTags: ['Booking']
    }),

    deleteBooking: builder.mutation ({
      queryFn: async (bookingId) => {
        const { data, error } = await supabase
          .from("bookings")
          .delete()
          .eq("id", bookingId)

         if (error) {
          return {error: { status: 500, statusText: 'Delete failed', data: error.message }}
        }

        return { data};
      },
      invalidatesTags: ['Booking']
    }),

    updateBooking: builder.mutation({      
      queryFn: async ({id, update}) => {
      
      const { data, error } = await supabase
        .from("bookings")
        .update(update)
        .eq("id", id)
        .select()
        .single()
        
        if (error) {
          return {error: {status: 400, statusText: 'Booking could not be updated', data: error.message}}        
        }

      return {data}
  },      
      invalidatesTags: ['Booking'] 
    })
  }),
});

export const {useGetBookingsQuery, useDeleteBookingMutation, useUpdateBookingMutation}=apiBooking

