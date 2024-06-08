import prisma from "@/prisma/prisma";
import {format} from 'date-fns'
import { Separator } from "@/components/ui/separator"

import { Props } from "../components/columns";

const QuestionnareView = async ({params}: {params: {id: string}}) => {
  const questionnaire = await prisma.video.findFirst({
    where: {
      id: params.id.toString()
    }
  })

  console.log(questionnaire)
  return (
    <div className="w-full mx-auto">
        <h2 className=" text-md">Video Questionnaire for: <span className=" font-semibold">{format(questionnaire!.weddingDate, "MM/dd/yyyy")}{' '}{questionnaire?.brideName}{' & '}{questionnaire?.groomName}</span></h2>
        <Separator className="my-4" />
        <div className="space-y-4">
            <p>Bride Name: <span className="font-semibold pl-2">{questionnaire?.brideName}</span></p>
            <p>Groom Name: <span className="font-semibold pl-2">{questionnaire?.groomName}</span></p>
            <p>Wedding Date: <span className="font-semibold pl-2">{format(questionnaire!.weddingDate, 'MM/dd/yyyy')}</span></p>
            <p>Email Address: <span className="font-semibold pl-2">{questionnaire?.email}</span></p>
            <p>Details to Include: <span className="font-semibold pl-2">{questionnaire?.details}</span></p>
            <Separator className="mt-4" />
            <h2 className="">Songs Selection</h2>
            <p>{questionnaire?.songsOptions}</p>
            <p>Highlights Video: <span className="font-semibold pl-2">{questionnaire?.highlightSong}</span></p>
        </div>
    </div>
  )
}

export default QuestionnareView