import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export const useSetEditProject = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, info }: any) => {
      const response = await axios.patch("/api/projects", {
        id: id,
        action: info.action,
        contractorId: info.contractorId,
      });
      console.log(response);
      if (response.status != 201) {
        throw new Error("Faild to fetch Project!");
      }
      const { data } = response;
      return data;
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Job was assigned!" });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.response.data });
    },
  });

  return mutation;
};
