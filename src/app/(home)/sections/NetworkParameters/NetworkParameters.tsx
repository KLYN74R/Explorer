import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { RedGradientBackground } from '@/components/ui';
import { fetchChainInfo } from '@/data';

export const NetworkParameters = async () => {
  const data = await fetchChainInfo();

  return (
    <RedGradientBackground sx={{ p: 3, pb: 5 }}>
      <Typography variant='h1'>
        Network Parameters
      </Typography>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12} md={12}>
          <ContentItem title='Symbiotic chain ID' value={data.symbioticChainId} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Validator stake size' value={data.validatorStakeSize} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Workflow major version' value={data.workflowMajorVersion} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Quorum size' value={data.quorumSize} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Unstaking period' value={data.unstakingPeriod} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Epoch duration' value={data.epochDuration} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Leader timeframe' value={data.leaderTimeframe} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Slot time(block time)' value={data.slotTime} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Max block size' value={data.maxBlockSize} />
        </Grid>
        <Grid item xs={12} md={12}>
          <ContentItem title='Limit For Operations On The Epoch Edge' value={data.limitForOperations} />
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