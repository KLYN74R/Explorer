'use client';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SelectChangeEvent, } from '@mui/material';
import { FlexBetweenBox, GeometricButton } from '@/components/ui';
import { FilterDropdown } from './FilterDropdown';
import { SearchInput } from './SearchInput';
import { OPTIONS, OPTIONS_URL, OPTIONS_PLACEHOLDER } from './constants';
import SearchIcon from '@public/icons/ui/search.svg';

export const ExplorerSearchBar = () => {
  const { push } = useRouter();
  const [searchType, setSearchType] = useState(OPTIONS.CHOOSE);
  const [query, setQuery] = useState('');

  const isChoose = searchType === OPTIONS.CHOOSE;

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
    push(`${OPTIONS_URL[searchType]}/${query.trim()}`);
  };

  return (
    <FlexBetweenBox
      border={1}
      borderColor='border.main'
      sx={{
        gap: 2,
        px: 0.4,
        background: 'rgba(17, 17, 17, 0.8)'
      }}
    >
      <FilterDropdown
        searchType={searchType}
        handleSearchTypeChange={handleSearchTypeChange}
      />
      <SearchInput
        placeholder={OPTIONS_PLACEHOLDER[searchType]}
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

