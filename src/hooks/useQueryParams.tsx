import { usePathname, useSearchParams } from 'next/navigation';

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getParam = (key: string, defaultValue: string) =>
    searchParams.get(key)?.toString() || defaultValue;

  return {
    page: Number(getParam('page', '1')),
    searchType: getParam('type', 'choose'),
    query: getParam('query', ''),
    shard: getParam('shard', ''),
    pathname,
    searchParams
  };
};