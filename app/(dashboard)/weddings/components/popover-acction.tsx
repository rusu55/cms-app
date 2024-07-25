
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

  import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export const PopoverAction = ({data}: any) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const services = formatServices(data.services);

    //Modal Body

    const body = (
      <div>
          <div className='flex'>
             <div>Package: Value</div>
             <div>{data.packagePrice}</div>                                  
        </div>
        <SimpleMDE placeholder='Description'/>      
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
                <Button variant="link">{data.brideName}</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                  <div>
                    <div>Contract Value: ${data.packagePrice}</div>
                    <Separator className="my-1" />
                    <p>Package Includes:</p>
                    <div className='grid grid-cols-2'>
                       {services.map((service: string, index: number) =>(
                        <div key={index}>{service}</div>
                       ))}
                    </div>
                    <Button onClick={()=>setOpen(true)}>Add Details</Button>
                  </div>
            </HoverCardContent>
        </HoverCard>
    </>
  )
}
