import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";


export const GET = async(request:NextRequest, {params}: {params: {year: string}}) =>{
    //console.log(params)
    try{
        const result = await prisma.engagement.findMany({
            where: {
                engagementCreated: {
                    gte: new Date(params.year + "-01-01").toISOString(),
                    lte: new Date(params.year + "-12-31").toISOString(),
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