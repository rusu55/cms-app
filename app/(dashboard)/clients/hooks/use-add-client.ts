import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';

import { interfaceClient } from '../types/interface';

const useAddClient = () =>{
    const queryClient = useQueryClient(); 
    //console.log(querys)
     //console.log('aaaaaaaaaaaaaaaaaaaaaaaa')
    //
    //console.log(addClient)
   
    return useMutation<interfaceClient, Error>({
        mutationFn: (addClient) =>
                 axios
                .post('/api/clients', addClient)
                .then(res => res.data),
        onSuccess: (savedClient, newClient) =>{
            console.log(savedClient)
            queryClient.invalidateQueries()
        }
    })

return ('merge')
}
export default useAddClient