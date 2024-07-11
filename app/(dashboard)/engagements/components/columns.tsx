"use client";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
//import { CellAction } from "./cell-action";
//mport { ServiceBadge } from "./serviceBadge";

export type Props = {
  id: string;
  groomName: string;
  brideName: string;
};
export const columns: ColumnDef<Props>[] = [
 
  {
    accessorKey: "brideName",
    header: "Bride",
  },
  {
    accessorKey: "groomName",
    header: "Groom",
  },  
  /*
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions",
  },
  */
];
