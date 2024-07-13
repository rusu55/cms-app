"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useNewContractor } from "../hooks/use-new-contractor";
import { useCreateContractor } from "../hooks/use-create-contractor";
import { ContractorForm } from "./contractor-form";

export const NewContractorSheet = () => {
  const { isOpen, onClose } = useNewContractor();
  const mutation = useCreateContractor();

  const onSubmit = async (values: any) => {
    console.log({ values });
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className=" space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Create ne Account...</SheetDescription>
        </SheetHeader>
        <ContractorForm onSubmit={onSubmit} disabled={false} />
      </SheetContent>
    </Sheet>
  );
};
