import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { RedGradientBackground } from '@/components';

export const NetworkParameters = () => {
  return (
    <RedGradientBackground sx={{ p: 3 }}>
      <Typography variant='h1'>
        Network Parameters
      </Typography>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12} md={12}>
          <ContentItem title='Symbiotic chain ID' value={5000} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Validator stake size' value='50K' />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Block creator reward' value='50%' />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='AFK Maxtime' value='10 epoches' />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Workflow major version' value={0} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Quorum size' value='127 validators' />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Unstaking period' value='4 epoches' />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Epoch duration' value='24 hours' />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Leader timeframe' value='120 seconds' />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Slot time(block time)' value='1 second' />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContentItem title='Max block size' value='1.28Mb' />
        </Grid>
        <Grid item xs={12} md={12}>
          <ContentItem title='Limit For Operations On The Epoch Edge' value={5000} />
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
      <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
    </Box>
  );
}