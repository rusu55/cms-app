import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuestionnaireModal } from "../hooks/use-questionnaire-modal";
import { QuestionnaireView } from "./questionnaire-view";

interface Props{
    isOpen: boolean;
    onClose?: () => void;
    title: string;
    className?: string;
    children?: React.ReactNode;
    handleClick?: () => void;
    buttonText?: string;  
    image?: string;
    buttonClassName?: string;
    buttonIcon?: string;
}
export const QuestionnaireModal = () =>{
    const { isOpen, onClose, questionnaireData } = useQuestionnaireModal();
    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none px-6 py-9">
                <div className="flex flex-col gap-6">
                
                <h1 className={cn("text-3xl font-bold leading-[42px]")}>
                    Salut
                </h1>
                <QuestionnaireView data={questionnaireData}/>
                </div>
            </DialogContent>
        </Dialog>
    )
}
