"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { useGetProjects } from "../hooks/use-get-projects";
import { columns } from "../components/columns";

const ProjectsPage = ({ params }: { params: { year: string } }) => {
  const projectQuery = useGetProjects(params.year);
  const projects = projectQuery.data || [];

  if (projectQuery.isLoading) {
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
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className=" border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className=" text-xl line-clamp-1">
            Projects Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable data={projects} columns={columns} filterKey="brideName" />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsPage;
