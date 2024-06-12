import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

const MenuContext = createContext<{
  openId: string;
  close: () => void;
  open: Dispatch<SetStateAction<string>>;
  position: string | null;
  setPosition: Dispatch<SetStateAction<null>>;
} | null>(null);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenuContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}
