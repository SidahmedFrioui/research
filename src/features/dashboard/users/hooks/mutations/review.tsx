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
      queryClient.invalidateQueries({
        queryKey: ['article']
      });
      queryClient.invalidateQueries({
        queryKey: ['article']
      });
      queryClient.invalidateQueries({
        queryKey: ['review']
      });
    },
  });
}

export function useMakeReviewer() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { userId: string }): Promise<any> => {
      return await apiClient.put(`/users/${data.userId}/make-reviewer`, {});
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'User made reviewer successfully',
        duration: 2000,
        variant: 'success'
      });

      queryClient.invalidateQueries({
        queryKey: ['users']
      });
    },
  });
}

export function useMakeEditor() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { userId: string }): Promise<any> => {
      return await apiClient.put(`/users/${data.userId}/make-editor`, {});
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'User made editor successfully',
        duration: 2000,
        variant: 'success'
      });

      queryClient.invalidateQueries({
        queryKey: ['users']
      });
    },
  });
}