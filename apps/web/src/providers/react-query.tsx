"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 0 } } })

export const ReactQueryProvider = ({ children }: any) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
