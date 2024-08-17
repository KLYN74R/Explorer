import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { RedGradientBackground } from '@/components/ui';
import { fetchChainData } from '@/helpers/data';

export const NetworkParameters = async () => {
  const {
    symbioticChainId,
    validatorStakeSize,
    blockCreatorReward,
    afkMaxtime,
    workflowMajorVersion,
    quorumSize,
    unstakingPeriod,
    epochDuration,
    leaderTimeframe,
    slotTime,
    maxBlockSize,
    limitForOperations
  } = await fetchChainData();

  return (
    <RedGradientBackground sx={{ p: 3 }}>
      <Typography variant='h1'>
        Network Parameters
      </Typography>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12} md={12}>
          <ContentItem title='Symbiotic chain ID' value={symbioticChainId} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Validator stake size' value={validatorStakeSize} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Workflow major version' value={workflowMajorVersion} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Quorum size' value={quorumSize} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Unstaking period' value={unstakingPeriod} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Epoch duration' value={epochDuration} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Leader timeframe' value={leaderTimeframe} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Slot time(block time)' value={slotTime} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Max block size' value={maxBlockSize} />
        </Grid>
        <Grid item xs={12} md={12}>
          <ContentItem title='Limit For Operations On The Epoch Edge' value={limitForOperations} />
        </Grid>
      </Grid>
    </RedGradientBackground>
  );
}

const ContentItem: FC<{ title: string, value: string | number }> = ({
  title,
  value
}) => {
  return (
    <Box sx={{ px: 1, pb: 0.5 }} border={1} borderColor='border.main'>
      <Typography variant='caption' color='text.secondary'>{title}</Typography>
      <Typography sx={{ fontWeight: 700, wordBreak: 'break-word' }}>{value}</Typography>
    </Box>
  );
}