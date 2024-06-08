"use client";

import { useMountedState } from "react-use";
import { QuestionnaireModal } from "@/app/(dashboard)/video/components/questionnaire-modal";

export const ModalProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <QuestionnaireModal />
    </>
  );
};
