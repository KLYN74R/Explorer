'use client';
import React, { FC } from 'react';
import { useQueryShard } from '@/hooks';
import { Autocomplete, AutocompleteValue, TextField } from '@mui/material';
import { FlexBetweenBox, GeometricButton } from '@/components/ui';
import SearchIcon from '@public/icons/ui/search.svg';
import { COLORS } from '@/styles';

type ComboboxItemProps = {
  label: string,
  value: string
}

export const ShardSearchBar: FC<{ shardsList: ComboboxItemProps[]}> = ({
  shardsList
}) => {
  const {
    shard,
    handleShardChange
  } = useQueryShard(shardsList);

  const isOptionEqualToValue = (option: ComboboxItemProps, value: ComboboxItemProps | null) => {
    return value ? option.value === value.value : false;
  };

  return (
    <FlexBetweenBox
      border={1}
      borderColor='border.main'
      sx={{
        gap: 2,
        pl: 1.5,
        pr: 0.4,
        background: COLORS.BG_LIGHT,
        position: 'relative'
      }}
    >
      <Autocomplete
        disablePortal
        options={shardsList}
        value={shard}
        disableClearable={true}
        onChange={handleShardChange as AutocompleteValue<any, any, any, any>}
        isOptionEqualToValue={isOptionEqualToValue}
        sx={{ flex: 1 }}
        renderInput={(params) => (
          <TextField {...params} />
        )}
      />
      <GeometricButton
        variant='cyan'
        disableShadow={true}
        sx={{ py: 0.75, cursor: 'default' }}
      >
        <SearchIcon />
      </GeometricButton>
    </FlexBetweenBox>
  );
}

