import styled from "styled-components";
import { Logo } from "../ui/Logo";
import Heading from "../ui/Heading";
import { LoginForm } from "../features/auth/LoginForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;


export const Login = () => {
   return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Login to your account</Heading>
      <LoginForm/>
    </LoginLayout>
  )
}