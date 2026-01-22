import useSWR from 'swr';

export interface OpeningHour {
  id: string;
  day_of_week: string;
  is_open: boolean;
  open_time: string;
  close_time: string;
  special_note: string | null;
  display_order: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useOpeningHours(options?: { refreshInterval?: number }) {
  const { data, error, isLoading, mutate } = useSWR<OpeningHour[]>(
    '/api/opening-hours',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
      dedupingInterval: 5000, // 5 seconds - faster updates for admin
      ...options,
    }
  );

  return {
    hours: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
