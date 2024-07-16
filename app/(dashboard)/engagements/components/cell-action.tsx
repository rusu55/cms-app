"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash, BookImage } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import { useOpenEditEngagement } from "../hooks/use-open-edit-engagement";

type Props = {
  id: string;
 // groomName: string;
 // brideName: string;
};
//type CellActionProps = {
 // data: Props;
//};
export const CellAction = ( {id} : Props ) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { onOpen } = useOpenEditEngagement();
  // const mutation = useDeleteClient();

  const onConfirm = async () => {
    // mutation.mutate(id)
    setOpen(false);
    //setLoading(false);
  };
  
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onOpen(id)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Engagement Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete Client
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
