import axios from "axios"
import { URLsupabase, publicKey} from "./apiInfo"
import { createAsyncThunk } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

export interface Room {
  id: number,
  created_at: string,
  name: string,
  maxPeople: number,
  price: number,
  discount: number,
  image: string ,
  discriptoin: string,
}

const headersRequest = {
          apikey: publicKey,
          Authorization: `Bearer ${publicKey}`,
        }

export const getRooms = createAsyncThunk<Room[] | void> (
  "rooms/fetchAll", 
  async() => {
    try {
      const response = await axios.get(`${URLsupabase}?select=*`, {
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
      await axios.delete(`${URLsupabase}?id=eq.${id}`, {
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