import { createSlice } from "@reduxjs/toolkit";
import { createRoom, deleteRoom, getRooms } from "../services/apiRooms";
import type { Room }  from '../services/apiRooms'
//НАДО ИЗМЕНИТЬ НА RTK QUERY - т.к. надо кэшированив
const initialState:Room[] = []

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder.addCase(getRooms.fulfilled, (_, action)=>action.payload )
    builder.addCase(deleteRoom.fulfilled, (state, action) =>       
      state.filter(room => room.id !== action.payload)
    )
    builder.addCase(createRoom.fulfilled, (state, action) =>{       
      state.push(action.payload)
    })
  },
})

export default roomsSlice.reducer;