import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';

export const GET = async () => {
    return NextResponse.json('Data returned', {status: 201});
}

export const POST = async (request: NextRequest) =>{

    const rawBody = await request.json();

    const schema = z.object({
        name: z.string(),
        email: z.string().email().optional(),
        phone: z.string().optional(),        
    })

    const response = schema.safeParse(rawBody);

    if (!response.success) {
        const { errors } = response.error;

        return NextResponse.json(errors, {status: 401})
    }

    return NextResponse.json(response, {status: 201})
}