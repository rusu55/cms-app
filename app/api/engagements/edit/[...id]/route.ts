import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/prisma";

export const GET = async (req: NextRequest, {params}: {params: {id: string}}) =>{

    try{      

        const response = await prisma.engagement.findFirst({
            where:{
                id: params.id.toString()
            },
            include:{
                client: true
            }
        })
        if(!response){
            return NextResponse.json('Engagement not found', {status: 401})
        }

        return NextResponse.json(response, {status: 201})

    }catch(error){
        return NextResponse.json(error, {status: 500})
    }

    
}