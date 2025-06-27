import { nanoid } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import toast from "react-hot-toast"
import { supabase, supabaseUrl } from "./supabase"

//Добавить "тосты" при успешной/неуспешной загрузке

export const apiRooms = createApi({
  reducerPath: 'apiRooms',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['Rooms'],
  endpoints: builder => ({

    getRooms: builder.query({
      queryFn: async () => {      
        const { data, error } = await supabase.from('room').select('*').order('id')
        if (error) {
          return { error: { status: 500, statusText: 'Internal Server Error', data: error.message } }
        }
        return { data }
      },   
      keepUnusedDataFor: 120, //хранение в сек в кэше после unmounting
      providesTags: ['Rooms']
    }),

    deleteRoom: builder.mutation({
      queryFn: async (id) => {
        const { data: roomData, error: getError } = await supabase.from('room').select('image').eq('id', id).single() //удаление картинки из стора

        if (getError || !roomData) {
          return {
            error: { status: 404, statusText: 'Not Found', data: getError?.message ||   'Комната не найдена'},
          }
        } 

        const fullImageUrl = roomData.image
        const bucketPath = fullImageUrl.split('/object/foto-room/')[1]; // public/MYfile.jpg
       
        const { error: deleteError } = await supabase.from('room').delete().eq('id', id)  //удаление строки из стора
        
        if (deleteError) {
          return { error: { status: 500, statusText: 'Failed to delete room', data: deleteError.message } }
        }
      
        if (bucketPath) {
          const { error: imageError } = await supabase.storage.from('foto-room').remove([bucketPath]);

          if (imageError) {
            console.error('Ошибка удаления картинки:', imageError.message);
          }
      }

        return { data: { success: true } }
      },
      invalidatesTags: ['Rooms'] //повторно getRooms после удаления
    }),

    createRoom: builder.mutation({
      queryFn: async(newRoom) => {
        console.log(newRoom);
        
        const nameFile = `${nanoid(5)}-${newRoom.image.name}`.replace(/\//g, '')
       
        const { error: upLoadImgErr } = await supabase.storage
          .from('foto-room')
          .upload(`public/${nameFile}`, newRoom.image)  // загрузка фото in supabase
        
        if (upLoadImgErr) {
          return { error: { status: 500, statusText: 'Upload Error ', data: upLoadImgErr.message } }
        }
        
        const URLupload = `${supabaseUrl}/storage/v1/object/foto-room/public/${nameFile}`
                
        const { data, error:insertError  } = await supabase
          .from('room')
          .insert([{...newRoom, image: URLupload }])
          .select()
          .single()

        if (insertError) {
          await supabase.storage.from('foto-room').remove([`public/${nameFile}`]); 
          return { error: { status: 500, statusText: 'DB Insert Error', data: insertError.message } }
        }
        
      return { data }
      },      

      invalidatesTags: ['Rooms'] //повторно getRooms после добавления
    }),

    updateRoom: builder.mutation({      
      queryFn: async ({ updateRoom, id }) => {
        const hasImagePath = updateRoom.image?.startsWith?.(supabaseUrl);

        const imagePath = hasImagePath
          ? updateRoom.image
          : `${nanoid(5)}-${updateRoom.image.name}`.replace(/\//g, '');

        const { data, error: updateError } = await supabase
          .from('room')
          .update({
            ...updateRoom,
            image: hasImagePath
              ? updateRoom.image
              : `${supabaseUrl}/storage/v1/object/foto-room/public/${imagePath}`,
          })
          .eq('id', id)
          .select()
          .single()
        
        if (hasImagePath) {
          return { data }
        }
      
        const { error: uploadError } = await supabase.storage
          .from('foto-room')
          .upload(`public/${imagePath}`, updateRoom.image)
      
        if (uploadError) {
          return {
            error: {
              status: 500,
              statusText: 'Upload Error',
              data: uploadError.message,
            },
          };
        }
      
        if (updateError) {
          const nameFileDelete = imagePath;
          await supabase.storage.from('foto-room').remove([`public/${nameFileDelete}`]);
        
          return {
            error: {
              status: 500,
              statusText: 'Update Error',
              data: updateError.message,
            },
          };
        }
      
        return { data };
  },      
      invalidatesTags: ['Rooms'] //повторно getRooms после добавления
    })


  })
})

export const {
  useGetRoomsQuery, 
  useDeleteRoomMutation, 
  useCreateRoomMutation,
  useUpdateRoomMutation
} = apiRooms

//======================================================================
/* toast.success("image upload")
 toast.error('Error createRoom') */

