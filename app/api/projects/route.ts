import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export const PATCH = async (request:NextRequest) => {
    const {id, action, contractorId} = await request.json()
   try{
    
    const response = await prisma.contractor.update({
        where:{ id: contractorId},
        data:
            (action === 'PhotoEdit' ? { photoId: id} : {videoId: id})              
    })
    
    
    return NextResponse.json('Updated', {status:201})
   }catch(error)
   {
    return NextResponse.json(error, {status: 500})
   }
    
}