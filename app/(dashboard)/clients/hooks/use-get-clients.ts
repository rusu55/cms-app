import { useQuery } from "@tanstack/react-query";
import prisma from "@/prisma/prisma";
import axios from "axios";

export const useGetClients = () => {
    const query = useQuery({
        queryKey: ['clients'],
        queryFn: async () => {
            const response = await axios.get('/api/clients')
            if(response.status != 201){
               throw new Error("Faild to fetch Clients!")
            }
            const {data} = response
            return data
           //console.log(response)
        }
    });

    return query
}