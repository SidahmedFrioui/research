import { apiClient } from '@/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import type { Review } from '#/types/review';

export interface AIReviewData {
  message: string;
  article_id: number;
  ai_probability: number;
  human_probability: number;
  decision: string;
  disclaimer: string;
}

export function useCreateReview({ id }: { id: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Review>): Promise<Review> => {
      return await apiClient.post<Partial<Review>, Review>(`/reviews/${id}`, data);
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Review created successfully',
        duration: 2000,
        variant: 'success'
      });

      queryClient.invalidateQueries({
        queryKey: ['reviews', id]
      });
    },
  });
}

export function useCreateAIReview({ id }: { id: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (articleId: number): Promise<AIReviewData> => {
      return await apiClient.post<{}, AIReviewData>(`/articles/${articleId}/ai-detect`, {});
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'AI review generated successfully',
        duration: 2000,
        variant: 'success'
      });

      queryClient.invalidateQueries({
        queryKey: ['ai-reviews', id]
      });
    },
  });
}

export function useValidate() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (articleId: number): Promise<AIReviewData> => {
      return await apiClient.put<{}, AIReviewData>(`/articles/${articleId}/status`, {
        status: "submitted"
      });
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Article validated successfully',
        duration: 2000,
        variant: 'success'
      });

      queryClient.invalidateQueries({
        queryKey: ['articles']
      });
    },
  });
}