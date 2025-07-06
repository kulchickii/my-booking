import { useForm, type SubmitHandler } from "react-hook-form";
import { useSignupMutation } from "../../services/apiAuth";
import toast from "react-hot-toast";
import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Button } from "../../ui/Button";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};


export const SignupForm = () => {
  const [signup, {isLoading}]=useSignupMutation()

  const { register, formState, getValues, handleSubmit, reset} = useForm<FormData>();
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormData> = async({ fullName, email, password }) => {
    try {
      await signup({ fullName, email, password }).unwrap()
      reset()
      toast.success("Пользователь зарегистрирован!");
    }catch(e){
      console.log('ошибка',e);
      toast.error("Ошибка регистрации");
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input  
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address.",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={()=>reset()}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;