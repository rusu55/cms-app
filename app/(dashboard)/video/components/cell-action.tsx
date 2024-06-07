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

interface Props {
    data:{
        id: string
        weddingDate: string
        brideName: string
        groomName: string
        email: string
        songsOptions: string
        highlightSong?: string
        videoSongs? : string
        details: string
        address: string
        city: string
        state: string
        zipCode: string
    }
}

export const CellAction: React.FC<Props> = ({data}) =>{
    const router = useRouter();
   const params = useParams();
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
          <DropdownMenuItem onClick={() => {}}>
            <Trash className="mr-2 h-4 w-4" /> Link Questionnaire
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
        </>
    )
}