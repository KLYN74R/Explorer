'use client';
import { Box, Typography } from '@mui/material';
import { InfoBlock } from '@/components/ui';
import { Epoch } from '@/definitions';
import React, { FC } from 'react';
import { VadlidatorsTable } from '@/components/ui/tables/ValidatorsTable';


export const ValidatorsQuorumSection: FC<{ epoch: Epoch }> = ({
  epoch
}) => {

  const quorum = epoch.poolsRegistry.map(validator => ({
    text: validator,
    url: `/pools/${validator}(POOL)`,
    inQuorum: epoch.quorum.includes(validator)
  }));

  return (
    <>
      <Typography variant='h1' sx={{ mt: 10, mb: 2 }}>Epoch quorum</Typography>
      <Typography sx={{ mt: 1, mb: 3 }}>Majority of them helps network to be decentralized</Typography>

      <Box sx={{ mt: 4 }}>
        {quorum.length ? (
          <VadlidatorsTable value={quorum} />
        ) : (
          <Typography color='primary.main'>No validators found</Typography>
        )}
      </Box>
    </>
  );
}

