import { create } from "zustand";

type NewEngagementState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
export const useSheetHook = create<NewEngagementState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
