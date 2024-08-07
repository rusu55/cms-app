import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import prisma from "@/prisma/prisma";
import { clientSchema } from "@/types/schemas";

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
        weddingLocation: z.string().optional(),
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

    const existingClient = await prisma.client.findFirst({
        where: {
            email: response.data.email
        }
    });

    if(existingClient){
        return NextResponse.json('User with this email already registerd!', {status: 401})
    }

    const newClient = await prisma.client.create({
        data:{
            brideName: response.data.brideName,
            groomName: response.data.groomName,
            email: response.data.email,
            secondaryEmail: response.data?.secondaryEmail,
            phone: response.data?.phone,
            weddingDate: response.data.weddingDate,
            weddingLocation: response.data?.weddingLocation,
            services: response.data.services,
            packagePrice: response.data.packagePrice
        }
    })
    
    const newProject = await prisma.project.create({
        data: {
            clientId: newClient.id.toString(),
            projectDate: response.data.weddingDate,
        }
    })
   
    let fields: any = {clientId: newClient.id}
    fields['weddingDate'] = response.data.weddingDate;
    if(newClient.services.includes("mainPhoto")) fields['mainPhotoId'] = null;
    if(newClient.services.includes("secondPhoto")) fields['secondPhotoId'] = null;
    if(newClient.services.includes("mainVideo")) fields['mainVideoId'] = null;
    if(newClient.services.includes("secondVideo")) fields['secondVideoId'] = null;
    if(newClient.services.includes("photobooth")) fields['photoboothId'] = null;
    
    const newWedding = await prisma.wedding.create({
            data: fields
    })

    if(newClient.services.includes("Engagement")){
        const newEngagement = await prisma.engagement.create({
            data:{
                clientId: newClient.id,
                engagementId: null,
                engagementDate: null,
            }
        })
    }
    
    return NextResponse.json(newClient, {status:201})
}