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
import { useEngagementSheet } from "../hooks/use-engagement-sheet";
//import { useCreateClient } from "../hooks/use-create-client";

const ClientForm = dynamic(
  () => import("@/app/(dashboard)/clients/components/client-form"),
  {
    ssr: false,
  }
);

export const EditEngagementSheet = () => {
  const [loading, isLoading] = useState<boolean>(false);
  const { isOpen, onClose } = useEngagementSheet();
  //const mutation = useCreateClient();

  const onSubmit = async (values: any) => {
    isLoading(true);
  //  mutation.mutate(values, {
    //  onSuccess: () => {
    //    onClose();
   //   },      
   // });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Create ne Account...</SheetDescription>
        </SheetHeader>
        <ClientForm onSubmit={onSubmit} disabled={false}  />
      </SheetContent>
    </Sheet>
  );
};
