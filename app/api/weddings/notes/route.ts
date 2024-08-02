import { NextRequest, NextResponse } from "next/server";
import {object, z} from 'zod';
import prisma from "@/prisma/prisma";

const schema = z.object({
    note: z.string(),
})
export const POST = async(req: NextRequest) =>{
    const body = await req.json();
    const response = schema.safeParse(body)

    if (!response.success) {
        const { errors } = response.error;

        return NextResponse.json(errors, {status: 401})
    }

    const newNote = await prisma.weddingNote.create({
        data:{
            note: body.note,
            weddingId: body.id
        }
    })

    return NextResponse.json(newNote, {status: 201})
}