import { useQuery,  useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetEngagements = ({ params }: any) => {
 console.log('s-a')
  const queryString =
    params.slug.length > 1
      ? `?key=${params["slug"][0]}&year=${params["slug"][1]}`
      : `?key=${params["slug"][0]}`;

console.log(params.slug)
const queryClient = useQueryClient()
queryClient.invalidateQueries({
  queryKey: ["engagements"],
  refetchType: 'all'
})

  const query = useQuery({
    queryKey: ["engagements"],
    queryFn: async () => {
      const response = await axios.get(`/api/engagements${queryString}`);

      if (response.status != 201) {
        throw new Error("Faild to fetch Engagements");
      }
      const { data } = response;
      return data;
    },
    
  });

  return query;
};