import SignupForm from "../features/auth/SignupForm"
import Heading from "../ui/Heading"

export const Users = () => {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm/>
    </>
  )
}