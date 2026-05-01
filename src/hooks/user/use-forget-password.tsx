import { apiClient } from '@/api/client';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../use-toast';

interface LoginResponse {
  accessToken: string;
}

interface LoginData {
  email: string;
  code?: string;
  newPassword?: string;
}

export function useSendResetCode() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: LoginData): Promise<LoginResponse> => {
      return await apiClient.post<LoginData, LoginResponse>('/users/forgot-password', data);
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Operation succeeded',
        duration: 2000,
        variant: 'success'
      });
    },
  });
}

export function useVerifyResetCode() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: LoginData): Promise<LoginResponse> => {
      return await apiClient.post<LoginData, LoginResponse>('/users/reset-password', data);
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Operation succeeded',
        duration: 2000,
        variant: 'success'
      });
    },
  });
}
