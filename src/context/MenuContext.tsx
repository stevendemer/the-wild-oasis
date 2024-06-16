import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

const ModalContext = createContext<{
  openModal: (name: string, props?: object) => void;
  closeModal: () => void;
  modal: { name: string; props: object } | null;
} | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<{ name: string; props: object } | null>(
    null
  );

  const closeModal = () => setModal(null);

  const openModal = (name: string, props = {}) => {
    setModal({ name, props });
  };

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("Use this inside a provider");
  }

  return ctx;
};
