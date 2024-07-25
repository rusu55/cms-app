import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export const PATCH = async (request:NextRequest) => {
    const {id, job, contractorId} = await request.json()
   try{
    console.log(job)
    let fields: any = {}
    if(job === 'mainPhoto') fields['mainPhotoId'] = contractorId
    if(job === 'mainVideo') fields['mainVideoId'] = contractorId
    if(job === 'secondPhoto') fields['secondPhotoId'] = contractorId

    if(job === 'photobooth') fields['photoboothId'] = contractorId
    
    const response = await prisma.wedding.update({
        where:{ id: id},
        data: fields                       
    })
    
    return NextResponse.json('Updated', {status:201})
   }catch(error)
   {
    return NextResponse.json(error, {status: 500})
   }
    
}