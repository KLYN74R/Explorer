'use client';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SelectChangeEvent, } from '@mui/material';
import { FlexBetweenBox, GeometricButton } from '@/components/ui';
import { FilterDropdown } from './FilterDropdown';
import { SearchInput } from './SearchInput';
import { FILTER_OPTIONS, PLACEHOLDER_TEXT } from './constants';
import SearchIcon from '@public/icons/ui/search.svg';

export const ExplorerSearchBar = () => {
  const { push } = useRouter();
  const [searchType, setSearchType] = useState('choose');
  const [query, setQuery] = useState('');

  const isChoose = searchType === FILTER_OPTIONS.CHOOSE;

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value);
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

