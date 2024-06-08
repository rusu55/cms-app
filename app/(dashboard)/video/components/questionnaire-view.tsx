'use client';
import { useRef } from "react";
import  { useReactToPrint} from 'react-to-print'
import { Button } from "@/components/ui/button";
import { QuestionnaireProps } from "@/types";
import {format} from 'date-fns'

export const QuestionnaireView = ({data}: {data: QuestionnaireProps}) => {
  const documentRef = useRef(null);
  const savePDF = useReactToPrint({
    content: () => documentRef.current,
    documentTitle: 'Video Questionnaire',
    bodyClass: 'p-16',
  })
  
  return (
    <>
      <div ref={documentRef}>
          <p className=''>Bride Name: {data.brideName}</p>
          <p className=''>Groom Name: {data.groomName}</p>
          <p className=''>Email: {data.email}</p>
          <p className=''>Wedding Date: {format(data.weddingDate, "MM/dd/yyyy")}</p>
          <p className=''>Songs Selection: {data.songsOptions}</p>
          <p className=''>Highlight Video: {data.highlightSong}</p>
          <p className=''>Full Length: {data.videoSongs}</p>
          <p className=''>Details: {data.details}</p>
          <p className=''>Address: {data.address}</p>       
      </div>
      <Button onClick={savePDF}>Print PDF</Button>
    </>
  )
}
