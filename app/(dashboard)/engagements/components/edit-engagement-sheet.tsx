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
import { useSheetHook } from "../hooks/use-sheet-hook";
//import { useCreateClient } from "../hooks/use-create-client";

const EngagementForm = dynamic(
  () => import("@/app/(dashboard)/engagements/components/engagement-form"),
  {
    ssr: false,
  }
);

export const EditEngagementSheet = () => {
  const [loading, isLoading] = useState<boolean>(false);
  const { isOpen, onClose } = useSheetHook();
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
          <SheetTitle>Engagement </SheetTitle>
          <SheetDescription>Edit Engagement...</SheetDescription>
        </SheetHeader>
        <EngagementForm onSubmit={onSubmit} disabled={false} />
      </SheetContent>
    </Sheet>
  );
};
