import React, { FC } from 'react';
import { Box, BoxProps, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SEARCH_OPTIONS } from './constants';
import ArrowDownIcon from '@public/icons/ui/arrowDown.svg';

export const FilterDropdown: FC<{
  searchType: string;
  handleSearchTypeChange: (e: SelectChangeEvent) => void;
}> = ({
  searchType,
  handleSearchTypeChange
}) => {
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
        <MenuItem value={SEARCH_OPTIONS.CHOOSE} sx={{ display: 'none' }}>Filter</MenuItem>
        <MenuItem value={SEARCH_OPTIONS.TRANSACTION_BY_HASH}>Tx ID</MenuItem>
        <MenuItem value={SEARCH_OPTIONS.BLOCK_BY_SID}>SID</MenuItem>
        <MenuItem value={SEARCH_OPTIONS.BLOCK_BY_ID}>Block ID</MenuItem>
        <MenuItem value={SEARCH_OPTIONS.POOL_BY_ID}>Pool ID</MenuItem>
        <MenuItem value={SEARCH_OPTIONS.EPOCH_BY_ID}>Epoch ID</MenuItem>
        <MenuItem value={SEARCH_OPTIONS.ACCOUNT_BY_ID}>Account ID</MenuItem>
        <MenuItem value={SEARCH_OPTIONS.CONTRACT_BY_ID}>Contract ID</MenuItem>
      </Select>
    </FormControl>
  );
}

const CustomSelectIcon = (props: BoxProps) => (
  <Box {...props}>
    <ArrowDownIcon />
  </Box>
);