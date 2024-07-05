import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProjects = (year: string) =>{
    const query = useQuery({
        queryKey: ['projects'],
        queryFn: async () =>{
            
        }
    })
    return query
}