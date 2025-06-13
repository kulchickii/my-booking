import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import styled from "styled-components"

const StyledAppContainer = styled.div`
  display:grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  `

const Main = styled.main`
  background-color: var(--color-grey-50);;
  padding: 4rem 4.8rem 6.4rem;
`

export const AppContainer = () => {
  return <StyledAppContainer>
    <Header/>
    <Sidebar/>
    <Main>
      <Outlet/>
    </Main>
  </StyledAppContainer>
}