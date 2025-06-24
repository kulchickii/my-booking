import { configureStore } from '@reduxjs/toolkit'
import { apiRooms } from '../services/apiRooms'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [apiRooms.reducerPath]: apiRooms.reducer,
  },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiRooms.middleware),
})

setupListeners(store.dispatch)

// Тип глобального состояния (RootState) — используется в useSelector
export type RootState = ReturnType<typeof store.getState>
//  Тип dispatch — используется в useDispatch
export type AppDispatch = typeof store.dispatch
