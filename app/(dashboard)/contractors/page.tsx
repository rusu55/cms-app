"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "./hooks/use-new-account";

const page = () => {
  const { onOpen } = useNewAccount();
  return (
    <div>
      <Button onClick={onOpen}>Add New Account</Button>
    </div>
  );
};

export default page;
