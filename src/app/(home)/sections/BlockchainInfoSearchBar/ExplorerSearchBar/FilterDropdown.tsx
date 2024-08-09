import React, { FC } from 'react';
import { Box, BoxProps, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FILTER_OPTIONS } from './constants';
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

const CustomSelectIcon = (props: BoxProps) => (
  <Box {...props}>
    <ArrowDownIcon />
  </Box>
);