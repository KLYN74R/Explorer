'use client';
import React, { FC, useMemo, useState } from 'react';
import { Autocomplete, AutocompleteValue, Box, TextField, Typography } from '@mui/material';
import { FlexBetweenBox, GeometricButton, InfoBlock } from '@/components/ui';
import SearchIcon from '@public/icons/ui/search.svg';
import { Epoch } from '@/definitions';
import { BG_COLORS } from '@/styles';

interface ComboboxItemProps {
  label: string,
  value: string
}

export const ShardValidatorsSection: FC<{ epoch: Epoch }> = ({
  epoch
}) => {
  const shardOptions: ComboboxItemProps[] = useMemo(() =>
    Object.keys(epoch.leadersSequence).map(shard => ({
      label: shard,
      value: shard
    })
  ), [epoch]);

  const [shard, setShard] = useState<ComboboxItemProps>(shardOptions[0]);

  const handleShardChange = (_: any, newValue: ComboboxItemProps) => {
    setShard(newValue);
  }

  const isOptionEqualToValue = (option: ComboboxItemProps, value: ComboboxItemProps | null) => {
    return value ? option.value === value.value : false;
  };

  const validators = epoch.leadersSequence[shard.value].map(validator => ({
    text: validator,
    url: `/pools/${validator}(POOL)`
  }));

  return (
    <>
      <Typography variant='h1' sx={{ mt: 10, mb: 2 }}>Sequence of leaders per shard</Typography>
      <Typography sx={{ mt: 1, mb: 3 }}>Choose a shard ID to visualize validators per shard</Typography>
      <FlexBetweenBox
        border={1}
        borderColor='border.main'
        sx={{
          gap: 2,
          pl: 1.5,
          pr: 0.4,
          background: BG_COLORS.GRAY_LIGHT,
          position: 'relative'
        }}
      >
        <Autocomplete
          disablePortal
          options={shardOptions}
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

      <Box sx={{ mt: 4 }}>
        {validators.length ? (
          <InfoBlock title='Validators' value={validators} />
        ) : (
          <Typography color='primary.main'>No validators found.</Typography>
        )}
      </Box>
    </>
  );
}

