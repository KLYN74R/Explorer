import { useQueryParams } from './useQueryParams';

export function useQueryPage() {
  const {
    pathname,
    searchParams,
    page: currentPage
  } = useQueryParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber > 1 ? String(pageNumber) : String(1));
    return `${pathname}?${params.toString()}`;
  }

  return {
    currentPage,
    createPageURL
  }
}