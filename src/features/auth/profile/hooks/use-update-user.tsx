import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import type { User } from "@/types/user";

type UserUpdateRequest = Partial<User>;

export function useEditUser() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
  
    return useMutation({
      mutationFn: async (data: { data: UserUpdateRequest, id: string }): Promise<any> => {
        return await apiClient.put<UserUpdateRequest, UserUpdateRequest>(`/users/${data.id}`, data.data);
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