import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetEngagements = (year: string) => {
    const query = useQuery({
        queryKey: ['engagements'],
        queryFn: async () => {
            const response = await axios.get(`/api/engagements/${year}`)
            if(response.status != 201){
               throw new Error("Faild to fetch Engagements")
            }
           const {data} = response
            return data
        }
    });

    return query
}