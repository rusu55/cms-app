'use client';
import dynamic from "next/dynamic";
import {useState} from 'react';
import { Separator } from "@/components/ui/separator";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
  import { Button } from "@/components/ui/button";
  import { AlertModal } from "@/components/modals/alert-modal";
  import { formatServices } from '@/utils/formatServices';
  import { useCreateNote } from "../hooks/use-create-note";

const WeddingDetailsForm = dynamic(
  () => import("@/app/(dashboard)/weddings/components/wedding-details-form"),
  {
    ssr: false,
  }
);

export const PopoverAction = ({data}: any) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const services = formatServices(data.client.services);
    const mutation = useCreateNote(data.id);

    //Modal Body
    const onSubmit  = async (values: any) =>{
        console.log(data.id)
        mutation.mutate(values, {
          onSuccess: () => {
            setOpen(false);
          }
        })
    }
    const body = (
      <div>
          <div className='flex'>
             <div>Package: Value</div>
             <div>{data.packagePrice}</div>                                  
        </div>
            <WeddingDetailsForm onSubmit={onSubmit} disabled={mutation.isPending} />
      </div>
       
    )
    
  return (
    <>
    <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={()=>{}}
        loading={loading}
        body={body}
        />
         <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="link">{data.client.brideName}</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                  <div>
                    <div>Contract Value: ${data.client.packagePrice}</div>
                    <Separator className="my-1" />
                    <p>Package Includes:</p>
                    <div className='grid grid-cols-2'>
                       {services.map((service: string, index: number) =>(
                        <div key={index}>{service}</div>
                       ))}
                    </div>
                    <Separator className="my-1" />
                    <div>
                      {data.notes.map((note, index) =>(
                        <p key={index}>{note.note}</p>
                      ))}
                    </div>
                    <Button onClick={()=>setOpen(true)}>Add Details</Button>
                  </div>
            </HoverCardContent>
        </HoverCard>
    </>
  )
}
