import {Card, CardHeader, CardContent, CardTitle} from '@/components/ui/card';
import { Props, columns } from "./components/columns"
import { DataTable } from '@/components/data-table';
import { format } from "date-fns";

import prisma from '@/prisma/prisma';

const VideoPage = async () => {
  
 const questionnaires = await prisma.video.findMany({
    orderBy: [{weddingDate: "asc"}]
 })
 let formatedData: any

 if(questionnaires){
  formatedData = questionnaires.map((questionaire: any)=>({
    id: questionaire.id.toString(),
    weddingDate: format(questionaire.weddingDate, "MM/dd/yyyy"),
    brideName: questionaire.brideName,
    groomName: questionaire.groomName,
    email: questionaire.email,
  }))
 }
  
  return (
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
      <Card className=' border-none drop-shadow-sm'>
          <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
            <CardTitle className=' text-xl line-clamp-1'>
              Video Questoinarres
            </CardTitle>
          </CardHeader>
          <CardContent>
              <DataTable columns={columns} data={formatedData} />
          </CardContent>
      </Card>
    </div>
  )
}

export default VideoPage