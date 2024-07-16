"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useGetEngagements } from "../hooks/use-get-engagements";
//import { useNewClient } from "../hooks/use-new-client";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { MainNav } from "../components/main-nav";

//import prisma from "@/prisma/prisma";

const EngagementsPage = ({ params }: { params: { slug: string } }) => {
  const engagementsQuerry = useGetEngagements({ params });
  const engagements = engagementsQuerry.data || [];

  if (engagementsQuerry.isLoading) {
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
    );
  }

  return (
    <>
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className=" border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className=" text-xl line-clamp-1">
              Engagements Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex w-full">
              <div className="border-b w-full">
                <div className="flex h-16 items-center px-4 justify-between">
                  <div className="flex items-center gap-12">
                    <span>Team Switcher</span>
                    <MainNav className="mx-6" />
                  </div>
                  <div>
                    <span>Search Input</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <DataTable
                columns={columns}
                data={engagements}
                filterKey="email"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EngagementsPage;
