import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export const PATCH = async (request:NextRequest) => {
    const {id, action, contractorId} = await request.json()
   try{
    
    const response = await prisma.project.update({
        where:{ id: id},
        data:
            (action === 'PhotoEdit' ? { photoEditId : contractorId} : {videoEditId: contractorId})              
    })
    
    return NextResponse.json('Updated', {status:201})
   }catch(error)
   {
    return NextResponse.json(error, {status: 500})
   }
    
}