"use client";
import { format, parse, addDays } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { EditingAction } from "./editing-action";
import { CellAction } from "./cell-action";
import { StatusAction } from "./status-action";
import { cn } from "@/lib/utils";
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
      return format(row.getValue("projectDate"), 'MM/dd/yyyy');
    },
  },
  {
    accessorKey: "client.brideName",
    header: "Bride Name",
  },
  {
    accessorKey: "status",
    header: "Project Status",
    cell: ({row}) =>{
      return(
        <div className="flex items-start">
          <div className="p-1 rounded-lg bg-red-200 text-center">
            <span>{row.getValue("status")}</span>
          </div>
          <div>
            <StatusAction data={row.original} />
          </div>
        </div>
      )    
     },
     
     
  },
  {
    accessorKey: "projectStatus",
    header: "Photo Due Date",
    cell: ({row}) =>{     
      const dueDate = format(addDays(new Date(row.getValue('projectDate')), 60), 'MM/dd/yyyy')
      return(
        <div>
          <span>{dueDate}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "projectStatus",
    header: "Video Due Date",
    cell: ({row}) =>{     
      const dueDate = format(addDays(new Date(row.getValue('projectDate')), 90), 'MM/dd/yyyy')
      return(
        <div>
          <span>{dueDate}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "editBy",
    header: "Photo Edited By",
    
    cell: ({row}) =>{
      
      return(
        <div className="flex justify-between items-start">
          <div>
             {row.getValue('editBy') !== null ? (<span>Not Assigned</span>) : (<span>{row.getValue('editBy')}</span>)}
          </div>
          <div>
            <EditingAction data={row.original} />
          </div>
        </div>
       
        
      )
    } 
    
  },
  {
    accessorKey: "editBy",
    header: "Video Edited By",
    cell: ({row}) =>{
      return(
        row.getValue('editBy') !== null ? (<span>Not Assigned</span>) : (<span>{row.getValue('editBy')}</span>)        
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions",
  },
];
