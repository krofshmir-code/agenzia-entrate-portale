import { useQueryClient } from "@tanstack/react-query";
import {
  useListDocuments,
  useCreateDocument,
  useGetDocument,
  useDeleteDocument,
  useListTemplates,
  useGetDashboardStats,
  getListDocumentsQueryKey,
  getGetDashboardStatsQueryKey,
} from "@workspace/api-client-react";

export function useDocuments() {
  return useListDocuments();
}

export function useDocument(id: number) {
  return useGetDocument(id);
}

export function useAddDocument() {
  const queryClient = useQueryClient();
  return useCreateDocument({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListDocumentsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetDashboardStatsQueryKey() });
      },
    },
  });
}

export function useRemoveDocument() {
  const queryClient = useQueryClient();
  return useDeleteDocument({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListDocumentsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetDashboardStatsQueryKey() });
      },
    },
  });
}

export function useTemplates() {
  return useListTemplates();
}

export function useDashboardStats() {
  return useGetDashboardStats();
}
