"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

import {columns} from '../components/columns';
import { useGetWeddings } from "../hooks/use-get-weddings";



const ProjectsPage = ({ params }: { params: { year: string } }) => {
  const queryWeddings = useGetWeddings(params.year)
  const weddings = queryWeddings.data || []
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className=" border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className=" text-xl line-clamp-1">
            Weddings Acount
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={weddings} filterKey="brideName"/>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsPage;
