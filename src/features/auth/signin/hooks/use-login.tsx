import { apiClient } from '@/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/types/user';

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginData): Promise<LoginResponse> => {
      return await apiClient.post<LoginData, LoginResponse>('/login', data);
    },
    onSuccess: ({ access_token }) => {
      toast({
        title: 'Success',
        description: 'Operation succeeded',
        duration: 2000,
        variant: 'success'
      });
      localStorage.setItem("token", access_token);

      queryClient.invalidateQueries({
        queryKey: ['user']
      });
      location.href = '/'
    },
  });
}
