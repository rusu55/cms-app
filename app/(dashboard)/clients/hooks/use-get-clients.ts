import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetClients = (year: string) => {
    const query = useQuery({
        queryKey: ['clients'],
        queryFn: async () => {
            const response = await axios.get(`/api/clients/${year}`)
            if(response.status != 201){
               throw new Error("Faild to fetch Clients!")
            }
           const {data} = response
            return data
           
        }
    });

    return query
}