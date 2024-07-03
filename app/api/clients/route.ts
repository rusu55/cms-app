import { NextRequest, NextResponse } from "next/server";

import {z} from 'zod'

import prisma from "@/prisma/prisma";

export const GET = async () => {
    const response = await prisma.client.findMany({})
    return NextResponse.json(response, {status: 201})
}

export const POST = async (request: NextRequest) =>{
    const body = await request.json();

    const schema = z.object({
        brideName: z.string().min(2).max(50),
        groomName: z.string().min(2).max(50),
        email: z.string().email(),
        secondaryEmail: z.string().email().optional(),
        phone: z.string().optional(),
        weddingDate: z.string(),
        services: z.array(z.string()).refine((value) => value.some((item) => item), {
          message: "You have to select at least one item.",
        }),
        packagePrice: z.string(),     
    })
    
    const response = schema.safeParse(body);

    if (!response.success) {
        const { errors } = response.error;

        return NextResponse.json(errors, {status: 401})
    }

    return NextResponse.json(body , {status:201})
}