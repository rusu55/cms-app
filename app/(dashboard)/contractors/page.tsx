"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useGetContractors } from "./hooks/use-get-contractors";
import { useNewContractor } from "./hooks/use-new-contractor";
import { DataTable } from "@/components/data-table";
import {columns} from './components/columns'
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

//import prisma from "@/prisma/prisma";

const ClientsPage =  ({ params }: { params: { year: string } }) => {
  const { onOpen } = useNewContractor();
  const clientsQuerry = useGetContractors(); 
  const clients = clientsQuerry.data || []

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
                Contractors Account
              </CardTitle>
              <Button onClick={onOpen}>Add New Contractor</Button>
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
