import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import prisma from "@/prisma/prisma";
import { contractorSchema } from "@/types/schemas";

export const GET = async(req: NextRequest, {params}: {params: {id: string}}) =>{
    const {id} = params;
    
    try{
        const response = await prisma.contractor.findFirst({
            where: {
                id: id.toString()
            }
        })

        if(!response){
            return NextResponse.json('Contractor not found!', {status: 401})
        }
        return NextResponse.json(response, {status: 201})
    }
    catch(error){
        return NextResponse.json(error, {status: 500})
    }
}

export const PATCH =  async (req: NextRequest, {params} : {params: {id: string}}) =>{
    const {id} = params;
    const reqBody =  await req.json();   
    
    const safeBody = contractorSchema.safeParse(reqBody);
    if(!safeBody.success){
        const {errors} = safeBody.error;

        return NextResponse.json(errors, {status: 401})
    }
    const {name, email, phone, role} = safeBody.data;

    const updateContractor = await prisma.contractor.update({
        where: {
            id: id.toString()
        },
        data: {
            name, email, phone, role
        }
    })
   

    return NextResponse.json(updateContractor, {status:201})
}