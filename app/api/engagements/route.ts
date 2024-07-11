import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";


export const GET = async(request:NextRequest) =>{
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.searchParams)
    console.log('s-a cerut Refresh data!!!')
    console.log(searchParams)
    searchParams.has('year') ? console.log('are year search') : console.log('nu are')
    try{
        const result = await prisma.engagement.findMany({
            where: 
                (searchParams.get('key') === 'scheduled' ? {engagementDate: { not: null}} : {engagementDate: null}),                              
            
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