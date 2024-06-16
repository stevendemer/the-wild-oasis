import { create } from "zustand";

export const useModal = create<{
  isOpen: boolean;
  onClose(): void;
  onOpen(): void;
  data: object;
  setData(data: object): void;
}>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  data: {},
  setData: (data) => set({ data }),
}));
