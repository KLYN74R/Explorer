'use client';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useQueryParams } from '@/hooks';
import { SelectChangeEvent, } from '@mui/material';
import { FlexBetweenBox, GeometricButton } from '@/components/ui';
import { FilterDropdown } from './FilterDropdown';
import { SearchInput } from './SearchInput';
import { FILTER_OPTIONS, PLACEHOLDER_TEXT } from './constants';
import SearchIcon from '@public/icons/ui/search.svg';

export const ExplorerSearchBar = () => {
  const { replace, push } = useRouter();
  const {
    searchType: initialSearchType,
    query: initialQuery,
    searchParams,
    pathname
  } = useQueryParams();

  const [searchType, setSearchType] = useState(initialSearchType);
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setSearchType(initialSearchType);
    setQuery(initialQuery);
  }, [initialSearchType, initialQuery]);

  const isChoose = searchType === FILTER_OPTIONS.CHOOSE;

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    handleSearch(newQuery);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    setQuery(term);
    const params = new URLSearchParams(searchParams);
    if (!isChoose && term) {
      params.set('type', searchType);
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    const newSearchType = event.target.value;
    setSearchType(newSearchType);
    const params = new URLSearchParams(searchParams);
    if (newSearchType !== FILTER_OPTIONS.CHOOSE) {
      params.set('type', newSearchType);
    } else {
      params.delete('type');
      setQuery('');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (isChoose || !query) {
      return false;
    }
    push(`/${searchType}/${query}`);
  };

  return (
    <FlexBetweenBox
      border={1}
      borderColor='border.main'
      sx={{
        gap: 2,
        px: 0.4,
        background: 'rgba(17, 17, 17, 0.6)'
      }}
    >
      <FilterDropdown
        searchType={searchType}
        handleSearchTypeChange={handleSearchTypeChange}
      />
      <SearchInput
        placeholder={PLACEHOLDER_TEXT[searchType]}
        isChoose={isChoose}
        query={query}
        handleQueryChange={handleQueryChange}
        handleKeyDown={handleKeyDown}
      />
      <GeometricButton
        variant='cyan'
        disableShadow={true}
        onClick={handleSubmit}
        sx={{ py: 0.75 }}
      >
        <SearchIcon />
      </GeometricButton>
    </FlexBetweenBox>
  );
}

