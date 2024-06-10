import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNewClient } from "../hooks/use-new-client";
import { ClientForm } from "./client-form";

export const NewClientSheet = () => {
  const { isOpen, onClose } = useNewClient();

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Create ne Account...</SheetDescription>
        </SheetHeader>
        <ClientForm onSubmit={onSubmit} disabled={false} />
      </SheetContent>
    </Sheet>
  );
};
