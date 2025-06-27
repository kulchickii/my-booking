import { cloneElement, createContext, useContext, useState, type ReactElement, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

interface Props {
  children: ReactNode
}

interface ModalContextType {
  openName: string
  close: () => void
  open: (openName: string) => void;
}

interface OpenProps  {
  children: ReactElement<{ onClick?: () => void }>;
  opens: string;
}

interface WindowProps {
  name: string
  children: ReactElement<{onCloseModal: () => void}>
}

const ModalContext = createContext<ModalContextType>({
  openName: "",
  close: () => { },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  open: (openName: string) => {},
})

export const Modal: React.FC<Props> & {
  Open: typeof Open;
  Window: typeof Window;
} = ({ children }) =>  {
  const [openName, setOpenName] = useState("")

  const close = () => setOpenName("")
  const open = setOpenName

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

const Open: React.FC<OpenProps> = ({ children, opens: opensWindowName }) =>  {
  const { open } = useContext(ModalContext)
  
  return cloneElement(children, { onClick: () => open(opensWindowName) })
}

const Window: React.FC<WindowProps> = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext)
  const ref = useOutsideClick(close)

  if (name !== openName) return null

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>❌</Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;