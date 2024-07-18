"use client";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";


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
    accessorKey: "client.brideName",
    header: "Bride Name",
  },
  {
    accessorKey: "location",
    header: "Venue",
  }, 
  {
    accessorKey: "location",
    header: "Main Photo",
  }, 
  {
    accessorKey: "location",
    header: "Second Photo",
  }, 
  {
    accessorKey: "location",
    header: "Main Video",
  }, 
  {
    accessorKey: "location",
    header: "Second Video",
  }, 
  {
    accessorKey: "location",
    header: "Photobooth",
  }, 
];
