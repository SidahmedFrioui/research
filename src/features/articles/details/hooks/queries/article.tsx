import { apiClient } from '@/api/client';
import { useQuery } from '@tanstack/react-query';
import type { Article } from '@/types/article';

export function useGetArticleById(id: string) {
    const { isPending, data, isError } = useQuery({
        queryKey: ['article', id],
        queryFn: () => apiClient.findOne<Article>(`/articles/${id}`),
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