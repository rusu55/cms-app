"use client";
import dynamic from "next/dynamic";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useOpenEditEngagement } from "../hooks/use-open-edit-engagement";
import { useGetEngagement } from "../hooks/use-get-engagement";
import { Loader2 } from "lucide-react";

const EngagementForm = dynamic(
  () => import("@/app/(dashboard)/engagements/components/engagement-form"),
  {
    ssr: false,
  }
);

export const EditEngagementSheet = () => {
  const { isOpen, onClose, id } = useOpenEditEngagement();
  const engagementQuery = useGetEngagement(id);

  const onSubmit = async (values: any) => {
    //  mutation.mutate(values, {
    //  onSuccess: () => {
    //    onClose();
    //   },
    // });
  };

  const defaultValues = engagementQuery.data
    ? {        
        engagementLocation: engagementQuery.data.engagementLocation,
        engagementDetails: engagementQuery.data.engagementDetails,
        engagementDate: engagementQuery.data.engagementDate,
      }
    : {
      engagementLocation: "",
      engagementDetails: "",
      engagementDate: "",
      };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Engagement </SheetTitle>
          <SheetDescription>Edit Engagement...</SheetDescription>
        </SheetHeader>
        {engagementQuery.isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className=" size-6 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <EngagementForm onSubmit={onSubmit} disabled={false} defaultValues={defaultValues} id={id} />
        )}
      </SheetContent>
    </Sheet>
  );
};
