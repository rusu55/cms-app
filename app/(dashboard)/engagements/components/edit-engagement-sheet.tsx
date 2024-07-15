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
import { useOpenEditEngagement } from "../hooks/use-open-edit-engagement";
import { useGetEngagement } from "../hooks/use-get-engagement";
 
const EngagementForm = dynamic(
  () => import("@/app/(dashboard)/engagements/components/engagement-form"),
  {
    ssr: false,
  }
);

export const EditEngagementSheet = () => {
  const [loading, isLoading] = useState<boolean>(false);
  const { isOpen, onClose, id } = useOpenEditEngagement();
  const engagementDetails = useGetEngagement(id)

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
