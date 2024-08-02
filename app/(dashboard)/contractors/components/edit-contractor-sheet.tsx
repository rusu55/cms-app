"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";


import { useOpenContractor } from "../hooks/use-open-contractor";
import { useGetContractor } from "../hooks/use-get-contrator";
import { useEditContractor } from "../hooks/use-edit-contractor";
import { ContractorForm } from "./contractor-form";


export const EditContractorSheet = () => {
  
  const { isOpen, onClose, id} = useOpenContractor();
 const contractorQuery = useGetContractor(id);
 const mutation = useEditContractor(id);
  
  const onSubmit = async (values: any) => {
    mutation.mutate({id, values},
      {
        onSuccess: () =>  onClose()
      }
    )
  };

  const defaultValues = contractorQuery.data  
  ? { 
    name: contractorQuery.data.name,
    email: contractorQuery.data.email,
    phone: contractorQuery.data.phone,
    role: contractorQuery.data.role
   }
  : {
      name: "",
      email: "",
      phone: "",
      role: [],
    }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className=" space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Contractor</SheetTitle>
          <SheetDescription>Create ne Account...</SheetDescription>
        </SheetHeader>
        {contractorQuery.isFetching ? (
          <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className=" size-6 text-muted-foreground animate-spin" />
        </div>
        ) : (
            <ContractorForm onSubmit={onSubmit} disabled={false} defaultValues={defaultValues} id={id} />
        )}
        
      </SheetContent>
    </Sheet>
  );
};
