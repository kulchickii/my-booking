import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "./supabase";

export const apiSettings = createApi({
  reducerPath: 'apiSettings',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['settings'],
  endpoints: builder => ({
    getSettings: builder.query({
      queryFn: async() => {
        const { data, error } = await supabase
          .from("settings")
          .select("*")
          .single()

        if (error) {
          return { error: { status: 404, statusText: 'Settings not found', data: error.message } }
        }
        return {data}
      },
      providesTags: ['settings']
    }),

    updateSettings: builder.mutation({
        queryFn: async(newSetting)=> {
          const { data, error } = await supabase
            .from("settings")
            .update(newSetting)
            .eq("id", 1)//В БД только одна строка настроек, и она имеет id=1
            .single()

          if (error) { 
            return {error: {status: 404, statusText: "update settings not found", data: error.message }}
          }
          return {data}
        },
        invalidatesTags: ['settings']
      })
  })
})

export const {
  useGetSettingsQuery, 
  useUpdateSettingsMutation
  } = apiSettings



