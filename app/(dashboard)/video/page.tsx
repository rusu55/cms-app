
import {columns } from "./components/columns"
import { DataTable } from '@/components/data-table';

import prisma from '@/prisma/prisma';

const VideoPage = async () => {
  
 const questionnaires: any = await prisma.video.findMany({
    orderBy: [{weddingDate: "asc"}]
 })
  
  return (
        <DataTable columns={columns} data={questionnaires} />     
  )
}

export default VideoPage