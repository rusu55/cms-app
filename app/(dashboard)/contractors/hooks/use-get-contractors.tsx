import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetContractors = () => {
    const query = useQuery({
        queryKey: ['contractors'],
        queryFn: async () => {
            const response = await axios.get(`/api/contractors`)
            if(response.status != 201){
               throw new Error("Faild to fetch Contractors!")
            }
           const {data} = response
            return data
           //console.log(response)
        }
    });

    return query
}