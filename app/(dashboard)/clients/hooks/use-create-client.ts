import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export const useCreateClient = () =>{
    const { toast } = useToast();
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (json) =>{
            const response = await axios.post('/api/clients', json)
            if(response.status != 201){
                throw new Error("Faild to fetch Clients!")
             }
             const {data} = response
             return data
        },
        onSuccess: () =>{
            toast({title: 'Merge', description: 'sadcsdfbdskfb'})
            queryClient.invalidateQueries({queryKey: ["clients"]});
        },
        onError: () =>{

        }
    })
    return mutation
}