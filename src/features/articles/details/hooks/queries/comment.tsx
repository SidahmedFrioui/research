import { apiClient } from '@/api/client';
import { useQuery } from '@tanstack/react-query';
import type { Comment } from '#/types/comment';

export function useGetCommentsByArticleId(id: string) {
    const { isPending, data, isError } = useQuery({
        queryKey: ['comments', id],
        queryFn: () => apiClient.findOne<Comment>(`/articles/${id}/comments`),
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