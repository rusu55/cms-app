"use client";
import { format } from "date-fns";


import { ColumnDef } from "@tanstack/react-table";
import { AssignJob } from "./assign-job-acction";
import { PopoverAction } from "./popover-acction";


export type Props = {
  id: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingLocation: string;
};
export const columns: ColumnDef<any>[] = [
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
    cell: ({row}) =>{
      return(
       <div>
          <PopoverAction data={row.original}/>
       </div>
      )
    }
  },
  {
    accessorKey: "client.weddingLocation",
    header: "Venue",
  }, 
  {
    accessorKey: "mainPhotoId",
    header: "Main Photo",
    cell: ({row}) => {
      return(        
          <>
              {row.original.client.services.includes("mainPhoto") ? (
                <div className="flex justify-between items-center">
                  <div>
                    {row.original.mainPhoto?.name ? (<span>{row.original.mainPhoto.name.split(" ")[0]}</span>) : (<span>Not Assigned</span>)}
                  </div>
                  <div>
                    <AssignJob job="mainPhoto" id={row.original.id} />
                  </div>
                </div>
                ) : 
                (<span className="w-full inline-block text-center bg-slate-300 p-2 text-muted-foreground">N/A</span>)}
          </>        
      )
    }        
  }, 
  {
    accessorKey: "secondPhotoId",
    header: "Second Photo",
    cell: ({row}) =>{
        return(
          <>
             {row.original.client.services.includes("secondPhoto") ? (
               <div className="flex justify-between items-center">
                  <div>
                      {row.original.secondPhoto?.name ? (<span>{row.original.secondPhoto.name.split(" ")[0]}</span>): (<span>Not Assigned</span>)}
                  </div>
                  <div>
                      <AssignJob job="secondPhoto" id={row.original.id} />
                    </div>
                </div>
         ): (<span className="w-full inline-block text-center bg-slate-300 p-2 text-muted-foreground">N/A</span>)}
          </>
        )
    }     
  }, 
  {
    accessorKey: "mainVideoId",
    header: "Main Video",
    cell: ({row}) =>{
      return(
        <>
         { row.original.client.services.includes("mainVideo") ? (
            <div className="flex justify-between items-center">
            <div>
              {row.original.mainVideo?.name ? (<span>{row.original.mainVideo.name.split(" ")[0]}</span>) : (<span>Not Assigned</span>)}
            </div>
            <div>
              <AssignJob job="mainVideo" id={row.original.id} />
            </div>
          </div>
          ) : 
          (<span className="w-full inline-block text-center bg-slate-300 p-2 text-muted-foreground">N/A</span>)}
      </>        
      )
    } 
  }, 
  {
    accessorKey: "secondVideoId",
    header: "Second Video",
    cell: ({row}) =>{
      return(
        <>
          {row.original.client.services.includes("secondVideo") ? (
            <div className="flex justify-between items-center">
                <div className="w-full">
                   {row.original.secondVideo?.name ? (<span>{row.original.secondVideo.name.split(" ")[0]}</span>): (<span className="inline-block text-center">Not Assigned</span>)}
                </div>
                <div>
                      <AssignJob job="secondVideo" id={row.original.id} />
                </div>
            </div>
          ): (<span className="w-full inline-block text-center bg-slate-300 p-2 text-muted-foreground">N/A</span>)}
        </>
      )
    }
  }, 
  {
    accessorKey: "photoboothId",
    header: "Photobooth",
    cell: ({row}) =>{
      return(
        <>
          {row.original.client.services.includes("photobooth") ? (
            <div className="flex justify-between items-center">
                <div>
                   {row.original.photobooth?.name ? (<span>{row.original.photobooth.name.split(" ")[0]}</span>): (<span>Not Assigned</span>)}
                </div>
                <div>
                      <AssignJob job="photobooth" id={row.original.id} />
                </div>
            </div>
          ): (<span className="w-full inline-block text-center bg-slate-300 p-2 text-muted-foreground">N/A</span>)}
        </>
      )
    }
  }, 
];
