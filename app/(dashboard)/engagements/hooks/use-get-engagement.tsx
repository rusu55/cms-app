import { useQuery,  useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Props = {
    id: String | undefined
}
export const useGetEngagement= (id?: string) => {
  
/*
const queryClient = useQueryClient()
queryClient.invalidateQueries({
  queryKey: ["engagement"],
  refetchType: 'all'
})
*/

  const query = useQuery({
    enabled: !!id,
    queryKey: ["engagement", {id}],
    queryFn: async () =>{
      console.log("use Get Engagement: " + id) 
        const response = await axios.get(`/api/engagements/edit/${id}`);
        if(response.status != 201){
            throw new Error("Faild to fetch Engagement");
        }
        const {data} = response;
        return data
    }
  })
  return query
};