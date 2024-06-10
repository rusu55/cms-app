'use client';
import { Button } from "@/components/ui/button";
import { useNewClient } from "../hooks/use-new-client";
export const ClientsBillboard = () => {

  const {onOpen} = useNewClient();

  return (
    <div>
      <Button onClick={onOpen}>New Client</Button>
    </div>
  )
}
