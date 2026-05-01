import { apiClient } from '@/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/types/user';

export interface SignUpResponse {
    user: User;
    access_token: string;
}

export interface SignUpData {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'editor' | 'reviewer' | 'author' | 'reader';
    profile_picture: string;
}

export function useSignUp() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: SignUpData): Promise<SignUpResponse> => {
            return await apiClient.post<SignUpData, SignUpResponse>('/register', data);
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
            location.href = '/dashboard';
        },
    });
}
