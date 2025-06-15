import { configureStore } from '@reduxjs/toolkit'
import roomsReducer from './roomsSlice'

export const store = configureStore({
  reducer: {
    rooms: roomsReducer
  },
})

// Тип глобального состояния (RootState) — используется в useSelector
export type RootState = ReturnType<typeof store.getState>
//  Тип dispatch — используется в useDispatch
export type AppDispatch = typeof store.dispatch
