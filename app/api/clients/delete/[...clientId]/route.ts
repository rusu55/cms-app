import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/prisma';

export const DELETE =  async (request: NextRequest, {params}:{params: {clientId: string}}) =>{
    try{
        const response = await prisma.client.delete({
            where:{
                id: params.clientId.toString()
            }
        })
        if (!response){
            return NextResponse.json('Client with this Id was not found!')
        }
        return NextResponse.json('Client was deleted succsessful!', {status: 201})
    }catch(error){
        return NextResponse.json("INternal error!", {status: 500})
    }
}