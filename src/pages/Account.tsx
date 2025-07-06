import { UpdatePasswordForm } from "../features/auth/UpdatePasswordForm"
import { UpdateUserDataForm } from "../features/auth/UpdateUserDataForm"
import Heading from "../ui/Heading"

export const Account = () => {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
    </>
  )
}