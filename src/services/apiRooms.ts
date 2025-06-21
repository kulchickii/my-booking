import axios from "axios"
import { URLsupabase, publicKey} from "./apiInfo"
import { createAsyncThunk, nanoid } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import type { RoomForm } from "../features/rooms/CreateRoom"

export interface Room {
  id: number,
  created_at: string,
  name: string,
  maxPeople: number,
  price: number,
  discount: number,
  image: string ,
  discription: string,
}

const headersRequest = {
  apikey: publicKey,
  Authorization: `Bearer ${publicKey}`,
}

export const getRooms = createAsyncThunk<RoomForm[] | void> (
  "rooms/fetchAll", 
  async() => {
    try {
      const response = await axios.get(`${URLsupabase}/rest/v1/room?select=*`, {
        headers: headersRequest ,
      })
      console.log('getRooms - запрос отправлен');
      console.log(response.data);
      toast.success("successful download")
      return response.data
    }catch(e) {
      toast.error('Error getRooms')
      console.error('Error getRooms:', e)
      throw e
    }
  } 
)

export const deleteRoom =createAsyncThunk(
  "rooms/deleteRoom",
   async (id:number): Promise<number> => {
    console.log('удаляю-',id);    
    try {
      await axios.delete(`${URLsupabase}/rest/v1/room?id=eq.${id}`, {
      headers: headersRequest,
    })
    return id
    } catch(e){
      toast.error('Error deleteRoom')
      console.error('Error deleteRoom:', e)
      throw e
    }
  }
)


export const createRoom = createAsyncThunk(
  "rooms/createRoom",
  async(newRoom: RoomForm) => {
    const file = [...newRoom.image][0]
    const nameFile = `${nanoid(5)}-${file.name}`.replace(/\//g, '')
    const URLupload = `${URLsupabase}/storage/v1/object/foto-room/public/${nameFile}`
    console.log(4343);
    
    try {
      //создание строки
      const response = await axios.post( // создам строку в БД
        `${URLsupabase}/rest/v1/room`,
        {...newRoom, image: URLupload}, 
        {
          headers: {
            ...headersRequest,
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }
      })
      toast.success("room added") 

      if(response.status === 201 ) { // если создание успешна, то я загружу фото
        await axios.put(URLupload, file,
          {
            headers: {
              ...headersRequest,
              "Content-Type": file.type,
              "x-upsert": "true",
            }
          })
          toast.success("image upload")
      }

      return response.data[0]
    } catch (e) {
      toast.error('Error createRoom')
      console.error('Error createRoom:', e)
      throw e
    }
  }
)

