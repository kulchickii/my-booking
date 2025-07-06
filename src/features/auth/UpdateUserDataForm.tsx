import { useState } from "react";
import { useGetCurrentUserQuery, useUpdateCurrentUserMutation } from "../../services/apiAuth";
import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import { Button } from "../../ui/Button";
import toast from "react-hot-toast";

export const UpdateUserDataForm = () => {
  const {data: user} = useGetCurrentUserQuery()
  const [updateUser, {isLoading:isUpdating}] = useUpdateCurrentUserMutation()

  const email = user?.email ?? ""
  const currentFullName = user?.user_metadata?.fullName ?? ""

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);
  
  
  const  handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullName) return;
    try{
      await updateUser({ fullName, avatar }).unwrap()
      setAvatar(null);
      (e.target as HTMLFormElement).reset();
      toast.success("Данные обновлены");
    }catch(e){
      console.log("Ошибка при обновлении профиля", e);
      toast.error("Ошибка при обновлении профиля");
    }
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          type="file" 
          id="avatar"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            setAvatar(file);
          }}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}
