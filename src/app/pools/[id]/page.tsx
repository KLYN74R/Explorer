import { Metadata } from 'next';
import { ContentBlock, Label } from '@/components/ui';
import { Box, Container, Grid, Typography } from '@mui/material';
import { fetchPoolById } from '@/data';
import { formatNumber, truncateMiddle } from '@/helpers';
import { StakersTable } from './StakersTable';
import PoolImage from '@public/icons/pages/pool.svg';

type PoolByIdPageProps = {
  params: {
    id: string;
  }
}

export const metadata: Metadata = {
  title: 'Pool info',
};

export default async function PoolByIdPage({ params }: PoolByIdPageProps) {
  const poolId = decodeURIComponent(params.id);
  const pool = await fetchPoolById(poolId);

  return (
    <Container maxWidth='xl' sx={{ py: 6 }}>
      <Grid container spacing={8} sx={{ px: { md: 4.5, xs: 0 } }}>
        <Grid item order={{ xs: 2, lg: 1 }} xs={12} lg={8} xl={7}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant='caption'>Pool info</Typography>
              <Typography variant='h1' sx={{ my: 0.25, wordBreak: 'break-all' }}>{truncateMiddle(poolId)}</Typography>
              <Label variant='green' sx={{ mr: 1.5 }}>{pool.poolStorage.totalPower}</Label>
              <Typography variant='caption' color='primary.main'>Total power</Typography>
            </Grid>

            <Grid item xs={12} sx={{ mt: 1.5 }}>
              <ContentBlock
                title='Pool Id:'
                value={poolId}
              />
            </Grid>
            <Grid item xs={12}>
              <ContentBlock
                title='Contract:'
                value='system/staking'
              />
            </Grid>
            <Grid item xs={12}>
              <ContentBlock
                title='Shard:'
                value={pool.poolOriginShard}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ContentBlock
                title='Percentage:'
                value={pool.poolStorage.percentage + '% (takes the pool)'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ContentBlock
                title='Overstake:'
                value={formatNumber(pool.poolStorage.overStake)}
              />
            </Grid>
            <Grid item xs={12}>
              <ContentBlock
                title='HTTP(S) URL:'
                value={pool.poolStorage.poolURL}
              />
            </Grid>
            <Grid item xs={12}>
              <ContentBlock
                title='WS(S) URL:'
                value={pool.poolStorage.wssPoolURL}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item order={{ xs: 1, lg: 2 }} xs={12} lg={4} xl={5} sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <PoolImage width={421} height={426} viewBox='0 0 421 426'  />
        </Grid>
      </Grid>

      <Box sx={{
        mt: 16,
        px: { md: 4.5, xs: 0 }
      }}>
        <Typography variant='h1'>Stakers</Typography>
        <StakersTable poolStakers={pool.poolStorage.stakers} />
      </Box>
    </Container>
  );
}