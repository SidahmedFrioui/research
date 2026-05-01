import { apiClient } from '@/api/client';
import { useQuery } from '@tanstack/react-query';
import type { Article } from '@/types/article';

export function useGetArticles() {
    const { isPending, data, isError } = useQuery({
        queryKey: ['article', 'accepted'],
        queryFn: () => apiClient.findOne<Article>('/articles/accepted'),
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
