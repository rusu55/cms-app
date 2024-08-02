import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetContractor = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ['contractor', {id}],
        queryFn: async () => {
            const response = await axios.get(`/api/contractors/edit/${id}`)
            if(response.status != 201){
               throw new Error("Faild to fetch Contractor!")
            }
           const {data} = response
            return data
        }
    });

    return query
}