import { apiClient } from '@/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { useUserStore } from '@/store/user';

interface LoginResponse {
  accessToken: string;
  user: any;
}

interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { clearUser } = useUserStore();

  return useMutation({
    mutationFn: async (data: LoginData): Promise<LoginResponse> => {
      return await apiClient.post<LoginData, LoginResponse>('/users/emailsignin', data);
    },
    onSuccess: ({ accessToken }) => {
      toast({
        title: 'Success',
        description: 'Operation succeeded',
        duration: 2000,
        variant: 'success'
      });
      localStorage.setItem("token", accessToken);

      queryClient.invalidateQueries({
        queryKey: ['user']
      });
      clearUser();
      location.href = ''
    },
  });
}
