'use client';
import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Autocomplete, AutocompleteValue, TextField } from '@mui/material';
import { useQueryParams } from '@/hooks';
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
  const { replace } = useRouter();
  const {
    shard: initialShard,
    searchParams,
    pathname
  } = useQueryParams();

  const [query, setQuery] = useState<ComboboxItemProps|undefined>(shardsList[0]);

  useEffect(() => {
    const shardById = shardsList.find(i => i.label === initialShard);

    const shard  = shardById ? shardById : shardsList[0];

    setQuery(shard);
    setQueryParameters(shard.label, !!shardById);
  }, [initialShard, shardsList]);

  const handleQueryChange = (_: any, newValue: ComboboxItemProps) => {
    if (newValue && newValue.label) {
      setQueryParameters(newValue.label, true);
    } else {
      setQuery(undefined);
    }
  }

  const setQueryParameters = (shard: string, shardWasFound: boolean) => {
    const params = new URLSearchParams(searchParams);
    params.set('shard', shard)
    if (!shardWasFound) {
      params.set('page', String(1));
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

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
        background: COLORS.BG_LIGHT
      }}
    >
      <Autocomplete
        disablePortal
        options={shardsList}
        value={query}
        disableClearable={true}
        onChange={handleQueryChange as AutocompleteValue<any, any, any, any>}
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

