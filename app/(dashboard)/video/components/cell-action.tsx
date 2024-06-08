import { useParams, useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash, BookImage } from "lucide-react";
import { useQuestionnaireModal } from "../hooks/use-questionnaire-modal";
import { QuestionnaireProps } from "@/types";

export const CellAction= ({data} : {data: QuestionnaireProps}) =>{

    const {onOpen, setData, questionnaireData} = useQuestionnaireModal();

    const router = useRouter();
   const params = useParams();

   const openModal = (data: QuestionnaireProps) =>{
    setData(data);
     onOpen();        
   }
    return(
        <>
        
            <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>                   
          <DropdownMenuItem onClick={() => router.push(`/video/${data.id}`)}>
            <BookImage className="mr-2 h-4 w-4" /> View and Print Questionnaire
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>openModal(data)}>
            <Trash className="mr-2 h-4 w-4" /> Link Questionnaire
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>        
       
        </>
    )
}