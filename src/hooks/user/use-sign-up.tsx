import { apiClient } from '@/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { useUserStore } from '@/store/user';

interface SignUpResponse {
    accessToken: string;
    user: any;
}

interface SignUpData {
    email: string;
    password: string;
    entreprise_name: string;
    phone_number: string;
    full_name: string;
    source: string;
}

export function useSignUp() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { clearUser } = useUserStore();

    return useMutation({
        mutationFn: async (data: SignUpData): Promise<SignUpResponse> => {
            return await apiClient.post<SignUpData, SignUpResponse>('/users/enterprisesignup', data);
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
            location.href = '/onboarding'
        },
    });
}
