import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";


export const GET = async(request:NextRequest) =>{
    console.log(request)
    console.log('intra')
    try{
        const result = await prisma.engagement.findMany({
            where: {
               engagementDate: {
                 not: null
               }
            },
            include:{
                client: true,
            },
            orderBy: [
                {
                    engagementCreated: 'asc'
                }
            ]
        })

        if(!result){
            return NextResponse.json("Clients not found!", {status: 401})
        }
        return NextResponse.json(result, {status: 201})
    }
    catch(error){
        return NextResponse.json("Internal Erroor", {status: 500})
    }
}