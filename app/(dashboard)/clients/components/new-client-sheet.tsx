"use client";
import dynamic from "next/dynamic";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useOpenNewClient } from "../hooks/use-open-new-client";
import { useCreateClient } from "../hooks/use-create-client";

const ClientForm = dynamic(
  () => import("@/app/(dashboard)/clients/components/client-form"),
  {
    ssr: false,
  }
);

export const NewClientSheet = () => {
  const [loading, isLoading] = useState<boolean>(false);
  const { isOpen, onClose } = useOpenNewClient();
  const mutation = useCreateClient();

  const onSubmit = async (values: any) => {
    isLoading(true);
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },      
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Client</SheetTitle>
          <SheetDescription>Create new Client...</SheetDescription>
        </SheetHeader>
        <ClientForm onSubmit={onSubmit} disabled={mutation.isPending}  />
      </SheetContent>
    </Sheet>
  );
};
