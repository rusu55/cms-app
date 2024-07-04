"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useGetClients } from "../hooks/use-get-clients";
import { useNewClient } from "../hooks/use-new-client";
import { DataTable } from "@/components/data-table";
import {columns} from '../components/columns';
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

//import prisma from "@/prisma/prisma";

const ClientsPage =  ({ params }: { params: { year: string } }) => {
  const { onOpen } = useNewClient();
  const clientsQuerry = useGetClients(params.year); 
  const clients = clientsQuerry.data || []
  
 /*
  const clients = await prisma.client.findMany({
   where: {
     weddingDate: {
      gte: new Date(params.year + "-01-01").toISOString(),
      lte: new Date(params.year + "-12-31").toISOString(),
     },
    },
 });
*/

if(clientsQuerry.isLoading){
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className=" border-none drop-shadow-sm">
        <CardHeader>
            <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-500 animate-spin" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
  return (
    <>         
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
          <Card className=" border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
              <CardTitle className=" text-xl line-clamp-1">
                Clients Account
              </CardTitle>
              <Button onClick={onOpen}>Add New Client</Button>
            </CardHeader>
            <CardContent>
              <DataTable data={clients} columns={columns} filterKey="email" />
            </CardContent>
          </Card>
        </div>     
    </>
  );
};

export default ClientsPage;
