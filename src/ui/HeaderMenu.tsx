import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ButtonIcon } from "./ButtonIcon";
import { Logout } from "../features/auth/Logout";


const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>👽</ButtonIcon>
      </li>

      {/* <li>DarkMode<DarkModeToggle /></li> */}

      <li><Logout /></li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;