import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useUpdateCurrentUserMutation } from "../../services/apiAuth";
import toast from "react-hot-toast";

interface FormData {
  password: string;
  passwordConfirm: string;
};

export const UpdatePasswordForm = () => {
  const { register, handleSubmit, formState, getValues, reset } = useForm<FormData>();
  const { errors } = formState;

  const [updateUser, {isLoading:isUpdating}] = useUpdateCurrentUserMutation()

  const onSubmit = async({ password }: FormData) => {
    try{
      await updateUser({ password }).unwrap()
      reset()
      toast.success("пароль обновлен");
    }catch(e){
      console.log("Ошибка при обновлении пароля", e);
      toast.error("Ошибка при обновлении пароля");
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "New password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={()=>reset()} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

