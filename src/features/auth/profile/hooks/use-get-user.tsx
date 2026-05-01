import { apiClient } from '@/api/client';
import { useQuery } from '@tanstack/react-query';
import type { User } from '@/types/user';

export function useGetUser() {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

    const { isPending, data, isError } = useQuery({
        queryKey: ['user'],
        queryFn: () => apiClient.findOne<User>('/user'),
        enabled: !!token,
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return {
        isPending,
        isError,
        data: token ? data : null,
    };
}
