import { apiClient } from '@/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import type { Comment } from '#/types/comment';

export function useCreateComment(id: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Comment>): Promise<Comment> => {
      return await apiClient.post<Partial<Comment>, Comment>(`/articles/${id}/comments`, data);
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Comment created successfully',
        duration: 2000,
        variant: 'success'
      });

      queryClient.invalidateQueries({
        queryKey: ['comments', id]
      });
    },
  });
}
