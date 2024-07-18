"use client";

import { useMountedState } from "react-use";
import { NewContractorSheet } from "@/app/(dashboard)/contractors/components/new-contractor-sheet";
import { NewClientSheet } from "@/app/(dashboard)/clients/components/new-client-sheet";
import { EditEngagementSheet } from "@/app/(dashboard)/engagements/components/edit-engagement-sheet";
import { EditContractorSheet } from "@/app/(dashboard)/contractors/components/edit-contractor-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <NewContractorSheet />
      <NewClientSheet />
      <EditEngagementSheet />
      <EditContractorSheet />
    </>
  );
};
