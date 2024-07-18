import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export const useEditContractor = (id?: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({id, values}: any) => {
      console.log(values)
      const response = await axios.patch(`/api/contractors/edit/${id}`, values);
      if (response.status != 201) {
        throw new Error("Faild to edit Contractor!");
      }
      const { data } = response;
      return data;
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Contractor Edited!" });
      queryClient.invalidateQueries({ queryKey: ["contractors"] });
      queryClient.invalidateQueries({queryKey: ["contractor", {id}]})
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.response.data });
    },
  });

  return mutation;
};
