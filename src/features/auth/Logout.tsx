import { useNavigate } from "react-router-dom";
import { ButtonIcon } from "../../ui/ButtonIcon";
import { useLogoutMutation } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const Logout = () => {
  const navigate = useNavigate()
  const [logout, {isLoading}]=useLogoutMutation()

  const logoutHandler = async() => {
    try {
      await logout().unwrap()
      navigate("/login", { replace: true })
    } catch (e) {
      toast.error("Ошибка выхода")
      console.log("Logout error:", e);
    }
  }

  return (
    <ButtonIcon disabled={isLoading} onClick={logoutHandler}>
      {!isLoading ? <span>🚪</span> : <div>Loading...</div>}
    </ButtonIcon>
  );
}