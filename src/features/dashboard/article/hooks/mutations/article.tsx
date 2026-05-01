import { apiClient } from '@/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import type { Article } from '#/types/article';

export function useCreateArticle() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Article>): Promise<Article> => {
      return await apiClient.post<Partial<Article>, Article>('/articles', data);
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Article created successfully',
        duration: 2000,
        variant: 'success'
      });

      queryClient.invalidateQueries({
        queryKey: ['articles']
      });
    },
  });
}
