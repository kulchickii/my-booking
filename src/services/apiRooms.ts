import axios from "axios"
import { URLsupabase, publicKey} from "./apiInfo"
import { createAsyncThunk } from "@reduxjs/toolkit"

interface Room {
  id: number,
  created_at: string,
  name: string,
  maxPeople: number,
  price: number,
  discount: number,
  image: string | null,
  discriptoin: string,
}

export const getRooms = createAsyncThunk<Room[] | void> (
  "rooms/fetchAll", 
  async() => {
    try {
      const response = await axios.get(URLsupabase, {
        headers: {
          apikey: publicKey,
          Authorization: `Bearer ${publicKey}`,
        },
      })
      console.log('getRooms - запрос отправлен');

      return response.data
    }catch(e) {
      console.error('Error getRooms:', e)
      throw e
    }
  } 
)