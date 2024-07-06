import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";


export const GET = async(request:NextRequest, {params}: {params: {year: string}}) =>{
    try{
        const result = await prisma.project.findMany({
            where: {
                projectDate: {
                    gte: new Date(params.year + "-01-01").toISOString(),
                    lte: new Date().toLocaleDateString(),
                }
            },
            include: {
              client: true
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
        return NextResponse.json("Internal Erroor", {status: 500})
    }
}