import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { useUserStore } from "@/store/user";

type UserUpdateRequest = {
    full_name: string
}

export function useEditUser() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { user } = useUserStore();
  
    return useMutation({
      mutationFn: async (data: UserUpdateRequest): Promise<any> => {
        return await apiClient.put<UserUpdateRequest, UserUpdateRequest>(`/users/${user?.entreprise.id}/${user?.user.id}`, data);
      },
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Operation succeeded',
          duration: 2000,
          variant: 'success'
        });
        queryClient.invalidateQueries({
          queryKey: ["user"]
        });
      },
    });
  }