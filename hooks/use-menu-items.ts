import useSWR from 'swr';

export interface MenuItem {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_type: string;
  file_name: string;
  storage_path: string;
  display_order: number;
  created_at: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useMenuItems(options?: { refreshInterval?: number }) {
  const { data, error, isLoading, mutate } = useSWR<MenuItem[]>(
    '/api/menu-items',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
      dedupingInterval: 60000, // 1 minute
      ...options,
    }
  );

  return {
    menuItems: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
