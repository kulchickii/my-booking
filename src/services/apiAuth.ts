import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { supabase } from "./supabase";

interface UpdateUserData {
  password?: string;
  data?: {
    fullName?: string;
  };
}

export const apiAuth = createApi({
  reducerPath: "apiAuth",
  baseQuery: fetchBaseQuery(),
  tagTypes:['auth'], //НЕЗАБУДЬ ПРО ТЕГ
  endpoints: builder => ({
    signup: builder.mutation({
      queryFn: async ({ fullName, email, password })=>{
       
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              fullName,
              avatar: "",
            },
          },
        });

        if (error) {
          return {error: {status: 400, statusText: 'Signup failed', data: error.message}}        
        }

        return {data}
      },
    }),

    login: builder.mutation({
      queryFn: async (loginData)=>{
        const { data, error } = await supabase.auth.signInWithPassword(loginData);

        if (error) {
          return {error: {status: 400, statusText: 'Login failed', data: error.message}}        
        }
        console.log('login>>',data);
        
        return {data}

      },
    }),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCurrentUser: builder.query<any, void>({
      queryFn: async ()=>{
        const { data: sessionData, error: sessionError} = await supabase.auth.getSession()
      
        if (sessionError) {
          return { error: { status: 401, statusText: 'Session error', data: sessionError.message}}
        }

        if (!sessionData.session) {
          return {error: {status: 401,statusText: 'Not authenticated', data: 'No active session'}}
        }

        const { data: userData, error: userError } = await supabase.auth.getUser()

        if (userError) {
          return {error: {status: 400,statusText: 'User fetch failed',data: userError.message}}
        }
        console.log('getCurrentUser',userData.user);
        
        return { data: userData.user }

      },
    }),
    
    logout: builder.mutation<null, void>({
      queryFn: async ()=>{
        const { error } = await supabase.auth.signOut();
        if (error) {
          return {error: {status: 400,statusText: 'Logout failed',data: error.message}}
        }
        return { data: null }
      },
    }),

    updateCurrentUser: builder.mutation({
      queryFn: async ({ password, fullName, avatar })=>{
         // коментируй внизу для публичного пользования❗❗❗❗❗❗❗
  // throw new Error("Profile updates are not allowed temporarily");

      //1. Обновление пароля или имени
        const updateData: UpdateUserData = {}

        if (password){
          updateData.password = password
        } 
        if (fullName){
          updateData.data = { fullName }
        } 
               
        const { data, error } = await supabase.auth.updateUser(updateData);
        
        if (error) {
          return { error: {status: 400,statusText: "Update failed",data: error.message,},};
        }

        if (!avatar) return {data}

 /*        //2. Загрузка изображения аватара
        const fileName = `public/avatar-${nanoid(5)}-${avatar.name}`
        
        const { error: uploadError  } = await supabase.storage
          .from("avatars")
          .upload(fileName, avatar);

          if (uploadError) {
            return {error: { status: 500,statusText: "Avatar upload failed",data: uploadError.message}};
          }

        //3. Обновляем ссылку на аватар у пользователя
        const { data: updatedUser, error: updateError  } = await supabase.auth.updateUser({
          data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
          },
        });

        if (updateError) {
          return {error: {status: 500,statusText: "Avatar link update failed",data: updateError.message}}
        } */

        return { data };
      },
    }),


  })
})


export const {
  useSignupMutation, 
  useLoginMutation, 
  useGetCurrentUserQuery,
  useLogoutMutation, 
  useUpdateCurrentUserMutation
} = apiAuth