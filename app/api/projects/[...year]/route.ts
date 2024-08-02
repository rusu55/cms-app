import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { format } from 'date-fns';


export const GET = async(request:NextRequest, {params}: {params: {year: string}}) =>{
   
    const date = new Date();     
    console.log( new Date(`${params.year}-${date.getMonth()}-${date.getDate()}`).toISOString())  
    try{
        const result = await prisma.project.findMany({
            where: {
                projectDate: {
                    gte: new Date(params.year + "-01-01").toISOString(),
                    lte: new Date(`${params.year}-${date.getMonth()}-${date.getDate()}`).toISOString()
                }
            },
            include: {
              client: true,
              photoEdit: true,
              videoEdit: true,
            },
           
            orderBy: [
                {
                    projectDate: 'asc'
                }
            ]
        })

        if(!result){
            return NextResponse.json("Clients not found!", {status: 401})
        }
        return NextResponse.json(result, {status: 201})
    }
    catch(error){
        return NextResponse.json("Internal Error", {status: 500})
    }
}

