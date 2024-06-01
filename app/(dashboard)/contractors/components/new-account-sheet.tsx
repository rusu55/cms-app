import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useNewAccount } from "../hooks/use-new-account";
import { ContractorForm } from "./contractor-form";

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();

  const onSubmit = (values: any) => {
    console.log({ values });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className=" space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Create ne Account...</SheetDescription>
        </SheetHeader>
        <ContractorForm
          onSubmit={onSubmit}
          disabled={false}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};
