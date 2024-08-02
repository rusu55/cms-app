import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
import prisma from "@/prisma/prisma";

export const GET = async () => {
    try{
        const result = await prisma.contractor.findMany({
            orderBy:[{
                name: 'asc'
            }]
        });

        if(!result){
            return NextResponse.json("Contractors not found!", {status: 401})
        }

        return NextResponse.json(result, {status: 201})
    }
    catch(error){
        return NextResponse.json("Internal Erroor", {status: 500})
    }
}

export const POST = async (request: NextRequest) =>{

    const rawBody = await request.json();

    const schema = z.object({
        name: z.string(),
        email: z.string().email().optional(),
        phone: z.string().optional(), 
        role: z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
          }),     
    })

    const response = schema.safeParse(rawBody);
    

    if (!response.success) {
        const { errors } = response.error;

        return NextResponse.json(errors, {status: 401})
    }

    const existingContractor = await prisma.contractor.findFirst({
        where: {
            email: response.data.email
        }
    });

    if(existingContractor){
        return NextResponse.json('Contractor with this email already registerd!', {status: 401})
    }

    const newContractor =  await prisma.contractor.create({
        data:{
            name: response.data.name,
            email: response.data.email,
            phone: response.data?.phone,
            role: response.data.role
        }
    })

    return NextResponse.json(newContractor, {status: 201})
}