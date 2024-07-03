'use client';

import {QueryClient, QueryClientProvider as ReactQueryClientProvider} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export const QueryClientProvider = ({children}: PropsWithChildren) => {
  const queryClient = new QueryClient();
  return (
    <ReactQueryClientProvider client={queryClient}>
        {children}
    </ReactQueryClientProvider>
  )
}
