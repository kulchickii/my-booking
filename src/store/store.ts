import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,

  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

/* 
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit"
import userDataReducer from './userDataSlice'
import agreementsReducer from './agreementsSlice'
import verificationReducer, { handlerError } from './verificationSlice'


const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: handlerError,
  effect: (action, listenerApi) => {
    if(action.payload) {
      setTimeout(()=>{listenerApi.dispatch(handlerError(''))}, 3000)//мидлвара на ошибку (показ окна и скрытие окна)
    }
  },
})
//---------------------
export const store = configureStore({
  reducer: {
    userData: userDataReducer, 
    agreements: agreementsReducer,
    verification: verificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

*/