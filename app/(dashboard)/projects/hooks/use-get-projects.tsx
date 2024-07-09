import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProjects = (year: string) => {
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await axios.get(`/api/projects/${year}`);
      if (response.status != 201) {
        throw new Error("Faild to fetch Clients!");
      }
      const { data } = response;
      return data;
    },
  });
  return query;
};
