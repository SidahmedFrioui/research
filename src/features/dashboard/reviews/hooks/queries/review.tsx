import { apiClient } from '@/api/client';
import { useQuery } from '@tanstack/react-query';
import type { Review } from '@/types/review';

export function useGetReviews(articleId: string) {
    const { isPending, data, isError } = useQuery({
        queryKey: ['review', articleId],
        queryFn: () => apiClient.findOne<Review>(`/articles/${articleId}/reviews`),
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
