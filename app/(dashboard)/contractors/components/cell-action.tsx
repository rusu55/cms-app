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

import { useOpenContractor } from "../hooks/use-open-contractor";

import { Separator } from "@/components/ui/separator";
type Props = {
  id: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
};
type CellActionProps = {
  data: Props;
};
export const CellAction: React.FC<CellActionProps> = ({ data: { id } }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");

  const {onOpen} = useOpenContractor();
  

  const onConfirm = async () => {
    if (type === "viewJobs") console.log("Jobsssssssssssssssssssss");
    setOpen(false);
    setType("");
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
            <Edit className="mr-2 h-4 w-4" /> Edit Contractor
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete Contractor
          </DropdownMenuItem>
          <Separator className="my-1" />
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
              setType("viewJobs");
            }}
          >
            <Trash className="mr-2 h-4 w-4" /> View Jobs
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
