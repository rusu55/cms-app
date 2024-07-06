"use client";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type Props = {
  id: string;
  projectDate: string;
  brideName: string;
  backup: boolean;
};
export const columns: ColumnDef<Props>[] = [
  {
    accessorKey: "projectDate",
    header: "Wedding Date",
    cell: ({ row }) => {
      return format(row.getValue("projectDate"), "PPP");
    },
  },
  {
    accessorKey: "client.brideName",
    header: "Bride Name",
  },
  {
    accessorKey: "backup",
    header: "Back Up",
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
