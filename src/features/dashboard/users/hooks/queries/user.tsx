import { apiClient } from '@/api/client';
import { useQuery } from '@tanstack/react-query';
import type { User } from '@/types/user';

export function useGetUsers() {
    const { isPending, data, isError } = useQuery({
        queryKey: ['users'],
        queryFn: () => apiClient.findOne<User>('/users/search'),
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return {
        isPending,
        isError,
        data
    };
}
