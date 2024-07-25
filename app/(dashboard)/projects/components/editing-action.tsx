"use client";
import { useState, useMemo } from "react";

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
import { Separator } from "@/components/ui/separator";
import { useGetContractors } from "../../contractors/hooks/use-get-contractors";
import { useSetEditProject } from "../hooks/use-setEdit-project";

type Props = {
  id: string;
  projectDate: string;  
  backup: boolean;
};
type CellActionProps = {
  data: Props;
};
export const EditingAction: React.FC<any> = ({ data: { id } }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});
  let contractors = [];

  const contractorsQuerry = useGetContractors();
  const mutation = useSetEditProject();

  if (contractorsQuerry.data) {
    contractors = contractorsQuerry.data.filter(
      (value: any) => value.role.includes("editor")
    );
  }

  const onConfirm = async () => {
    mutation.mutate(
      { id, info },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
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
          <DropdownMenuLabel>Asign Job</DropdownMenuLabel>
          <Separator className="my-1" />
          {contractors.map((contractor: any, index: number) => (
            <DropdownMenuItem
              key={index}
              onClick={() => {
                setOpen(true);
                setInfo({ action: "PhotoEdit", contractorId: contractor.id });
              }}
            >
              <Trash className="mr-2 h-4 w-4" /> {contractor.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
