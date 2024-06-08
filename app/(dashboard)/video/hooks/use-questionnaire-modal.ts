import { create } from "zustand";

type Props ={
    isOpen: boolean;
    questionnaireData: any;
    onOpen: () => void;
    onClose: () => void;
    setData: (values: any) => void;
}
export const useQuestionnaireModal = create<Props>((set)=>({
    isOpen: false,
    questionnaireData: '',
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
    setData: (data: any) => set({questionnaireData: data})
}))