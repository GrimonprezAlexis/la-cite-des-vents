import useSWR from 'swr';

export interface ContactSettings {
  phone: string;
  email: string;
  announcement: string;
  announcement_active: boolean;
}

const DEFAULT_SETTINGS: ContactSettings = {
  phone: '022 797 10 70',
  email: '',
  announcement: '',
  announcement_active: false,
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useContactSettings(options?: { refreshInterval?: number }) {
  const { data, error, isLoading, mutate } = useSWR<ContactSettings>(
    '/api/contact-settings',
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateIfStale: true,
      dedupingInterval: 5000,
      fallbackData: DEFAULT_SETTINGS,
      ...options,
    }
  );

  return {
    settings: data || DEFAULT_SETTINGS,
    isLoading,
    isError: error,
    mutate,
  };
}
