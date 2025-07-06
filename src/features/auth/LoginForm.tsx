import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useLoginMutation } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { FormRowVertical } from "../../ui/FormRowVertical";
import Form from "../../ui/Form";

export const LoginForm = () => {
  const [login, { isLoading}] = useLoginMutation();

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>  {
    e.preventDefault();
    if (!email || !password) return;

    try{
      await login({ email, password }).unwrap()
      toast.success("Успешный вход")
      setEmail("")
      setPassword("")
      navigate("/dashboard", {replace: true,})
    }catch (e) {
      toast.error("Ошибка входа")
      console.log("Login error:", e);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
         <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        /> 
      </FormRowVertical>

      <FormRowVertical label="Password">
       <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        /> 
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Log in" : <div>Loading...</div>}
        </Button> 
      </FormRowVertical>
    </Form>
  )

}
