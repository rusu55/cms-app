
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetWeddings = (year: string) => {
    const query = useQuery({
        queryKey: ['weddings'],
        queryFn: async () =>{
            const response = await axios.get(`/api/weddings/${year}`)

            if(response.status != 201){
                throw new Error("Faild to fetch Clients!")
             }
             return response.data
        }
    })
  return query;
}

