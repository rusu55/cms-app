import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export const useCreateNote = (id?: string) =>{
    const {toast} = useToast()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (json: any) =>{            
            
            const response = await axios.post('/api/weddings/notes', {
                id: id,
                note: json.details
            })
            if(response.status != 201){
                throw new Error("Faild to fetch Clients!")
             }
             const {data} = response
             return data
        },
        onSuccess: () =>{
            toast({title: 'Wedding Note', description: 'New Note was added!'})
            queryClient.invalidateQueries({queryKey: ["weddings"]});
        },
        onError: (error: any) =>{
            toast({title: 'Error', description: error.response.data})
        }
    })
    return mutation
}