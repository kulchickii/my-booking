import { configureStore } from '@reduxjs/toolkit'
import { apiRooms } from '../services/apiRooms'
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiSettings } from '../services/apiSettings'
import { apiBooking } from '../services/apiBooking'
import { apiAuth } from '../services/apiAuth'

export const store = configureStore({
  reducer: {
    [apiRooms.reducerPath]: apiRooms.reducer,
    [apiSettings.reducerPath]: apiSettings.reducer,
    [apiBooking.reducerPath]: apiBooking.reducer,
    [apiAuth.reducerPath]: apiAuth.reducer,
  },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(apiRooms.middleware)
        .concat(apiSettings.middleware)
        .concat(apiBooking.middleware)
        .concat(apiAuth.middleware)

})

setupListeners(store.dispatch)

// Тип глобального состояния (RootState) — используется в useSelector
export type RootState = ReturnType<typeof store.getState>
//  Тип dispatch — используется в useDispatch
export type AppDispatch = typeof store.dispatch
