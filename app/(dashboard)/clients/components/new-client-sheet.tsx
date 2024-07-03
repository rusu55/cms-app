"use client";
import dynamic from "next/dynamic";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNewClient } from "../hooks/use-new-client";

const ClientForm = dynamic(
  () => import('@/app/(dashboard)/clients/components/client-form'),
  {
    ssr: false,    
  }
);


export const NewClientSheet = () => {
  const [loading, isLoading] = useState<boolean>(false);
  const { isOpen, onClose } = useNewClient();
  const { toast } = useToast();
  

  
  const onSubmit = async (values: any) => {
    isLoading(true);    
    console.log(values);
    axios.post("/api/clients", values)
        .then((response)=>{
            console.log(response)
            toast({title: 'Success', description: "New Client was addedd!"})
            onClose()
         })
        .catch((error)=>(
          toast({title: "Error Ocurred", description: "Client was not added!"})
        ))
        .finally(()=>{
          isLoading(false)
        })
    //toast({ title: "Success", description: "Added" });
    //axios.post("/api/clients", values).then((response) => {});
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
