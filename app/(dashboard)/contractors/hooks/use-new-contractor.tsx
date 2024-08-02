import { create } from "zustand";

type NewAccountState ={   
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export const useNewContractor = create<NewAccountState>((set)=>({
    isOpen: false,    
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false })
}))