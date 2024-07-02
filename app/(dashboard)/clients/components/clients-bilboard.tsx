"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useNewClient } from "../hooks/use-new-client";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
export const ClientsBillboard = ({ clients }: any) => {
  const { onOpen } = useNewClient();

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className=" border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className=" text-xl line-clamp-1">
            Clients Account
          </CardTitle>
          <Button onClick={onOpen}>Add New Client</Button>
        </CardHeader>
        <CardContent>
          <DataTable data={clients} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
};
