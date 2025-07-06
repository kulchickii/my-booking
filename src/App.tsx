import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { StylesGlobal } from "./styles/GlobalStyles"

import { store } from "./store/store"
import { Provider } from 'react-redux'

import { Dashboard } from "./pages/Dashboard"
import { Bookings } from "./pages/Bookings"
import { Cabins } from "./pages/Rooms"
import { Users } from "./pages/Users"
import { Settings } from "./pages/Settings"
import { Account } from "./pages/Account"
import { Login } from "./pages/Login"
import { PageNotFound } from "./pages/PageNotFound"
import { AppContainer } from "./ui/AppContainer"
import { Toaster } from "react-hot-toast"
import { Booking } from "./pages/Booking"
import { Checkin } from "./pages/Checkin"
import ProtectedRoute from "./ui/ProtectedRoute"

function App() {
  return (
    <Provider store={store}>
      <StylesGlobal/>
      <BrowserRouter>
        <Routes>   
          <Route element = {
            <ProtectedRoute>
              <AppContainer/>
            </ProtectedRoute>
          }
            >
            <Route index element={<Navigate replace to='dashboard'/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="bookings" element={<Bookings/>}/>
            <Route path="bookings/:bookingId" element={<Booking/>}/>
            <Route path="checkin/:bookingId" element={<Checkin />} />

            <Route path="cabins" element={<Cabins/>}/>
            <Route path="users" element={<Users/>}/>
            <Route path="settings" element={<Settings/>}/>
            <Route path="account" element={<Account/>}/>
          </Route>

          <Route path="login" element={<Login/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>

      <Toaster 
        position="bottom-right" 
        reverseOrder={false}
        gutter={8} 
        containerStyle={{margin: "10px"}}
        toastOptions={{
          success: {duration:2000},
          error: {duration:2000 },
          style:{
            fontSize:"24px",
            maxWidth:"600px",
            padding: "8px 16px",
          }
        }}
      />
    </Provider>
  )
}

export default App
