"use client";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type Props = {
  id: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
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
    accessorKey: "projectStatus",
    header: "Project Status",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions",
  },
];
