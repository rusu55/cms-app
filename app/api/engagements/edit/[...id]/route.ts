import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/prisma";

export const GET = async (req: NextRequest, {params}: {params: {id: string}}) =>{

    try{
        if(!params.id){
            return NextResponse.json('ID missing', {status: 401})
        }

        const response = await prisma.engagement.findFirst({
            where:{
                id
            }
        })
    }catch(error){
        return NextResponse.json(error, {status: 500})
    }

    return NextResponse.json(response, {status: 201})
}