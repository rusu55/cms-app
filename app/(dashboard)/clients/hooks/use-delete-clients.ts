import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export const useDeleteClient = () =>{
    const { toast } = useToast();
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (id: string) =>{
            const response = await axios.delete(`/api/clients/delete/${id}`)
            if(response.status != 201){
                throw new Error("Failed to delete Client!")
             }
             const {data} = response
             return data
        },
        onSuccess: () =>{
            toast({title: 'Success!', description: 'Client Deleted!'})
            queryClient.invalidateQueries({queryKey: ["clients"]});
        },
        onError: (error: any) =>{           
            toast({title: 'Error', description: error.response.data})
        }
    })
    
    return mutation
}