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
    accessorKey: "name",
    header: "Contractor Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "role",
    header: "Roles",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions",
  },
];
