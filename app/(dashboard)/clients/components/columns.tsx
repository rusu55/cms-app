"use client";
import { ColumnDef } from "@tanstack/react-table";

export type Props = {
  groomName: string;
};
export const columns: ColumnDef<Props>[] = [
  {
    accessorKey: "groomName",
    header: "groom Name",
  },
];
