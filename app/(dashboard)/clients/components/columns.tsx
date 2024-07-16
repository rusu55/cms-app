"use client";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ServiceBadge } from "./serviceBadge";

export type Props = {
  id: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  services: any;
};
export const columns: ColumnDef<Props>[] = [
  {
    accessorKey: "weddingDate",
    header: "Wedding Date",
    cell: ({ row }) => {
      return format(row.getValue("weddingDate"), "PPP");
    },
  },
  {
    accessorKey: "brideName",
    header: "Bride",
  },
  {
    accessorKey: "groomName",
    header: "Groom",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "services",
    header: "Wedding Package",
    cell: ({row}) => {
      
      return (
        <div>
          {row.original.services.map((service: string, index: number)=>(
            <ServiceBadge key={index} service={service} icon=''/>
          ))}
        </div>
      )    
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions",
  },
];
