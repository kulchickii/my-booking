import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick"; 

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface StyledListProps {
  position: {
    x: number;
    y: number;
  } | null;
}

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position?.x}px;
  top: ${(props) => props.position?.y}px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface Position {
  x: number
  y: number
}

interface MenusContextProps {
  openId: string 
  close: () => void
  open:  (id:string) => void
  position: Position 
  setPosition: Dispatch<SetStateAction<Position>>;
}

interface MenusProps {
  children: ReactNode
}

interface ToggleProps {
  id: string
}

interface Position {
  x: number
  y: number
}

const MenusContext = createContext<MenusContextProps>({
    openId: "",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    open: (id: string) => {},
    close: () => {},
    position: {x: 0, y:0} ,
    setPosition: () => {}
  }
)

export const Menus: React.FC<MenusProps>&{
  Menu: typeof Menu
  Toggle: typeof Toggle
  Button: typeof Button
  List: typeof List
}
= ({ children }) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState<Position>({x: 0, y:0})

  const close = () => setOpenId("")
  const open = setOpenId
  
  return (
    <MenusContext.Provider value={{ openId, close, open, position, setPosition }}>
      {children}
    </MenusContext.Provider>
  );
}

const Toggle: React.FC<ToggleProps>=({ id })=>  {
  const { openId, close, open, setPosition } = useContext(MenusContext)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    const target = e.target as HTMLElement
    const button = target?.closest("button")

    if(!button) return 

    const rect = button.getBoundingClientRect()

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    })

    if (openId === "" || openId !== id) {
      open(id)
    } else {
      close()
    }
  }
  return (
    <StyledToggle onClick={handleClick}>+</StyledToggle>
  );
}

interface ListProps{
  id: string 
  children: ReactNode
}

const List: React.FC<ListProps> =({ id, children })=>  {
  const { openId, position, close } = useContext(MenusContext);

  const ref = useOutsideClick(close, false)

  if (openId !== id) return null

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

interface ButtonProps {
  children: ReactNode;
  icon: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, icon, onClick, disabled }) => {
  const { close } = useContext(MenusContext)

  function handleClick() {
    onClick?.()
    close()
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled = {disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button
