import styled from "styled-components"
import { Logo } from "./Logo"
import { MainNav } from "./MainNav"


const AsibeBar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  display: flex;
  flex-direction:column;
  gap: 3.2rem;
`

export const Sidebar =()=> {
  return ( 
    <AsibeBar>
      <Logo/>
      <MainNav/>
    </AsibeBar>
  )
}