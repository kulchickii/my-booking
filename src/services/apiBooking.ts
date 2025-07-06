import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "./supabase";
import { PAGE_SIZE } from "../ui/Pagination";
import toast from "react-hot-toast";

export interface Room {
  name: string;
  image: any; 
  price: number;
  
}

export interface Guest {
  fullName: string;
  email: string;
  nationality: string;
  passport: string;
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
  hasBreakfast: boolean;
  isPaid: boolean;
  roomPrice: number;
  extrasPrice: number;
  observation: string;
  room: Room 
  guest: Guest
}

interface GetBookingsResponse {
  bookings: Booking[];
  count: number;
}

export interface BookingFilter {
  field: string
  value: string
  method?: 'eq'
}

export interface BookingSort {
  field: string;
  direction: 'asc' | 'desc';
}

export interface BookingQueryParams {
  filter?: BookingFilter;
  sortBy?: BookingSort;
  page?: number;    
}


export const apiBooking = createApi({
  reducerPath: 'apiBooking',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['Booking'],
  endpoints: (builder) => ({
    getBookings: builder.query<GetBookingsResponse, BookingQueryParams | void>({
      queryFn: async (params: BookingQueryParams = {}) => {
        const { filter, sortBy, page} = params

        let query = supabase
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

        if (filter){
          query = (query as any)[filter.method || 'eq'](filter.field, filter.value)
        } 
        if (sortBy){
          query = query.order(sortBy.field, { ascending: sortBy.direction === "asc",})
        }  
        
        if (page) {
          const from = (page - 1) * PAGE_SIZE;
          const to = from + PAGE_SIZE - 1;
          query = query.range(from, to);
        }

        const { data, error , count} = await query
        
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
      toast.success(`Booking updated`);
      return {data}
  },      
      invalidatesTags: ['Booking'] 
    }),

    getBooking: builder.query({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("bookings")
          .select("*, room(*), guest(*)")
          .eq("id", id)
          .single();

        if (error) {
          return { error: { status: 404, statusText: "Booking not found", data: error.message } };
        }
      
        return { data };
      },
    }),
  }),
  
});

export const {
  useGetBookingsQuery, 
  useDeleteBookingMutation, 
  useUpdateBookingMutation,
  useGetBookingQuery
}=apiBooking

