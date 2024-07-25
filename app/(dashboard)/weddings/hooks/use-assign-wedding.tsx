import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { error } from "console";

export const useAssignWedding = (id?: string) =>{
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({id, info }: any) =>{
            const response = await axios.patch("/api/weddings", {
                id: id,
                job: info.job,
                contractorId:  info.contractorId
            })

            if (response.status != 201) {
                throw new Error("Faild to fetch Project!");
              }
              const { data } = response;
              return data;
        }, 
        onSuccess: () =>{
            toast({ title: "Success", description: "Job was assigned!" });
            queryClient.invalidateQueries({ queryKey: ["weddings"]})
        },
        onError: (error: any) =>{
            toast({ title: "Error", description: error.response.data });
        }
    })

    return mutation

}