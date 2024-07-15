import { create } from "zustand";

type NewEngagementState = {
  isOpen: boolean;
  id?: string;
  onOpen: (id: string) => void;
  onClose: () => void;
};
export const useOpenEditEngagement = create<NewEngagementState>((set) => ({
  isOpen: false,
  id: undefined,
  onOpen: (id: string) => set({ isOpen: true, id}),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
