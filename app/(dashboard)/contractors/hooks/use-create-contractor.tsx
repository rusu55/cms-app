import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export const useCreateContractor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json) => {
      const response = await axios.post("/api/contractors", json);
      if (response.status != 201) {
        throw new Error("Faild to fetch Contractors!");
      }
      const { data } = response;
      return data;
    },
    onSuccess: () => {
      toast({ title: "Success", description: "New Contractor added!" });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.response.data });
    },
  });

  return mutation;
};
