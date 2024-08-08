'use client';
import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  Box,
  useTheme,
  SelectChangeEvent,
  BoxProps
} from '@mui/material';
import { FlexBetweenBox, GeometricButton } from '@/components/ui';
import SearchIcon from '@public/icons/ui/search.svg';
import ArrowDownIcon from '@public/icons/ui/arrowDown.svg';

const FILTER_OPTIONS = {
  CHOOSE: 'choose',
  TRANSACTIONS: 'transactions',
  SHARDS: 'shards',
  BLOCKS: 'blocks',
  POOLS: 'pools',
  CONTRACTS: 'contracts'
};

const PLACEHOLDER_TEXT = {
  [FILTER_OPTIONS.CHOOSE]: '<-- Apply a filter to look up for a TXID, SID, Block ID, Pool ID or Contract ID',
  [FILTER_OPTIONS.TRANSACTIONS]: 'Enter Transaction ID (TXID)',
  [FILTER_OPTIONS.SHARDS]: 'Enter Shard ID (SID)',
  [FILTER_OPTIONS.BLOCKS]: 'Enter Block ID',
  [FILTER_OPTIONS.POOLS]: 'Enter Pool ID',
  [FILTER_OPTIONS.CONTRACTS]: 'Enter Contract ID',
};

export const ExplorerSearchBar = () => {
  const [searchType, setSearchType] = useState('choose');
  const [query, setQuery] = useState('');

  const theme = useTheme();

  const isChoose = searchType === FILTER_OPTIONS.CHOOSE;

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
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

    alert(`Search ${searchType}: ${query}`)
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
        setSearchType={setSearchType}
        setQuery={setQuery}
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

const FilterDropdown: FC<{
  searchType: string;
  setSearchType: (type: string) => void;
  setQuery: (query: string) => void;
}> = ({
  searchType,
  setSearchType,
  setQuery
}) => {
  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value);
    if (event.target.value === FILTER_OPTIONS.CHOOSE) {
      setQuery('');
    }
  };

  return (
    <FormControl variant="standard">
      <Select
        labelId="search-type-label"
        label="Type"
        value={searchType}
        onChange={handleSearchTypeChange}
        IconComponent={CustomSelectIcon}
        sx={{
          borderRight: '1px solid',
          '& .MuiSelect-select.MuiSelect-standard.MuiInputBase-input': {
            pl: 4.5,
            pr: 2,
            py: 0.8
          }
        }}
      >
        <MenuItem value={FILTER_OPTIONS.CHOOSE} sx={{ display: 'none' }}>Filter</MenuItem>
        <MenuItem value={FILTER_OPTIONS.TRANSACTIONS}>TXID</MenuItem>
        <MenuItem value={FILTER_OPTIONS.SHARDS}>SID</MenuItem>
        <MenuItem value={FILTER_OPTIONS.BLOCKS}>Block ID</MenuItem>
        <MenuItem value={FILTER_OPTIONS.POOLS}>Pool ID</MenuItem>
        <MenuItem value={FILTER_OPTIONS.CONTRACTS}>Contract ID</MenuItem>
      </Select>
    </FormControl>
  );
}

const SearchInput: FC<{
  placeholder: string
  isChoose: boolean,
  query: string,
  handleQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: KeyboardEvent) => void;
}> = ({
  placeholder,
  isChoose,
  query,
  handleQueryChange,
  handleKeyDown
}) => {
  return (
    <TextField
      placeholder={placeholder}
      value={query}
      onChange={handleQueryChange}
      onKeyDown={handleKeyDown}
      spellCheck={false}
      autoComplete="off"
      sx={{ flex: 1 }}
      InputProps={{
        readOnly: isChoose,
        disableUnderline: true,
        style: {fontSize: '14px'}
      }}
    />
  );
}

const CustomSelectIcon = (props: BoxProps) => (
  <Box {...props}>
    <ArrowDownIcon />
  </Box>
);