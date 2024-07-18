import { create } from "zustand";

type EditContractorState ={
    id?: string;
    isOpen: boolean;
    onOpen: (id?: string) => void;
    onClose: () => void;
}
export const useOpenContractor = create<EditContractorState>((set)=>({
    isOpen: false,
    id: undefined,
    onOpen: (id?: string) => set({isOpen: true, id}),
    onClose: () => set({isOpen: false, id: undefined })
}))