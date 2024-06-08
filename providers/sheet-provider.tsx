"use client";

import { useMountedState } from "react-use";
import { NewAccountSheet } from "@/app/(dashboard)/contractors/components/new-account-sheet";
import { NewClientSheet } from "@/app/(dashboard)/clients/components/new-client-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
      <NewClientSheet />
    </>
  );
};
