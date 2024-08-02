import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export const GET =  async (req: NextRequest, {params} : {params: {year: string}}) =>{
    const {year} = params

    try{

        const weddings = await prisma.wedding.findMany({
            where: {
                weddingDate:{
                    gte: new Date(params.year + "-01-01").toISOString(),
                    lte: new Date(params.year + "-12-31").toISOString(),
                }
            },
            orderBy: [
                {
                    weddingDate: 'asc'
                }
            ],
            include: {
                client: true,
                mainPhoto: true,
                mainVideo: true,
                secondPhoto: true,
                secondVideo: true,
                photobooth: true,
                notes: true,
            },
           
        })

        if(!weddings){
            return NextResponse.json("Weddings not found", {status: 401})
        }
       
        return NextResponse.json(weddings, {status: 201})
    }catch(error){
        return NextResponse.json("Internal Erroor", {status: 500})
    }
    
    return NextResponse.json('Weddings', {status: 201})
}