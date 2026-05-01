import { apiClient } from '@/api/client';
import { useQuery } from '@tanstack/react-query';

export interface User {
    user: {
        id: string;
        email: string;
        full_name: string;
        password_hash: string;
        entreprise_id: string;
        role: string;
    };
    entreprise: {
        id: string;
        name: string;
        email: string;
        phone_number: string;
        address: string;
        created_at: string | null;
        nif: string;
        nis: string;
        rib: string;
        nin: string;
        nis_dgsn: string;
        nrc: string;
        isSetup: boolean;
    };
    roles: string[];
    permissions: string[];
}

export interface UserEntity {
    id: string;
    email: string;
    full_name: string;
    password_hash: string;
    entreprise_id: string;
    role: string;
    roles: string[];
    permissions: string[];
}

export function useGetUser() {
    const token = localStorage.getItem('token');

    const { isPending, data, isError } = useQuery({
        queryKey: ['user'],
        queryFn: () => apiClient.findOne<User>('/users/data'),
        enabled: !!token,
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return {
        isPending,
        isError,
        data: token ? data : null,
    };
}
