"use client";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
//mport { ServiceBadge } from "./serviceBadge";

export type Props = {
  id: string;
  groomName: string;
  brideName: string;
  client: any
};
export const columns: ColumnDef<Props>[] = [
  {
    accessorKey: "client.weddingDate",
    header: "Wedding Date",
    cell: ({ row }) => {
      return format(row.original.client.weddingDate, "PPP");
    },
  },
  {
    accessorKey: "client.brideName",
    header: "Bride",
  },
  {
    accessorKey: "client.groomName",
    header: "Groom",
  },   
  
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions",
  },

];
