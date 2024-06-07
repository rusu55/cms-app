"use client"
 
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { CellAction } from "./cell-action";

 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Props = {
  id: string
  weddingDate: string
  brideName: string
  groomName: string
  email: string
  songsOptions: string
  highlightSong?: string
  videoSongs? : string
  details: string
  address: string
  city: string
  state: string
  zipCode: string
}
 
export const columns: ColumnDef<Props>[] = [
  {
    accessorKey: "weddingDate",
    header: "WeddingDate",
  },
  {
    accessorKey: "brideName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bride Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "groomName",
    header: "groom Name",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />,
    header: "Actions",
  },
]