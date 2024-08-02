"use client"
import {useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { Copy, Edit, MoreHorizontal, Trash, BookImage } from "lucide-react";
  import { AlertModal } from "@/components/modals/alert-modal";
  import { Separator } from "@/components/ui/separator";

  import { useGetContractors } from "../../contractors/hooks/use-get-contractors";
  import { useAssignWedding } from '../hooks/use-assign-wedding';

  type Props = {
    id: string,
    job: string,
  }

export const AssignJob: React.FC<Props> = ({job, id}) =>{
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({});
    let contractors: any = [];
    let jobString: string

    if(job.includes("Photo")) { jobString = 'photographer'}
    if(job.includes("Video")) { jobString = 'videographer' }
    if(job.includes("photobooth")) {jobString = 'photobooth'}
    const contractorsQuerry = useGetContractors();
    const mutation = useAssignWedding();

    if (contractorsQuerry.data) {
        contractors = contractorsQuerry.data.filter(
          (value: any) => value.role.includes(jobString)
        );
      }

    const onConfirm = async () => {
        mutation.mutate(
            {id, info},
            {
                onSuccess: () => {
                    setOpen(false)
                }
            }        
        );      
      };

    return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 border">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Asign Job</DropdownMenuLabel>
          <Separator className="my-1" />
          {contractors.map((contractor: any, index: number) => (
            <DropdownMenuItem
              key={index}
              onClick={() => {
                setOpen(true);
                setInfo({ job: job, contractorId: contractor.id });
              }}
            >
              <Trash className="mr-2 h-4 w-4" /> {contractor.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};