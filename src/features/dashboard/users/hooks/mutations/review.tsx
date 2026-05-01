import { apiClient } from '@/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export function useAssignReviewer() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { articleId: string, reviewerId: string }): Promise<any> => {
      return await apiClient.post(`/articles/${data.articleId}/assign-reviewer`, {
        reviewer_id: data.reviewerId
      });
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Reviewer assigned successfully',
        duration: 2000,
        variant: 'success'
      });

      queryClient.invalidateQueries({
        queryKey: ['articles']
      });
    },
  });
}
