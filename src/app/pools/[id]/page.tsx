import { Metadata } from 'next';
import { ContentBlock, EntityPageLayout, Label, PageContainer } from '@/components/ui';
import { Box, Typography } from '@mui/material';
import { fetchPoolById } from '@/data';
import { formatNumber, truncateMiddle } from '@/helpers';
import { StakersTable } from './StakersTable';
import PoolImage from '@public/icons/pages/pool.svg';

type PageProps = {
  params: {
    id: string;
  }
}

export const metadata: Metadata = {
  title: 'Pool info',
};

export default async function PoolByIdPage({ params }: PageProps) {
  const poolId = decodeURIComponent(params.id);
  const pool = await fetchPoolById(poolId);

  return (
    <PageContainer sx={{ py: 6 }}>
      <EntityPageLayout
        header={{
          title: 'Pool info',
          value: truncateMiddle(poolId),
          label: {
            variant: pool.isActiveValidator ? 'green' : 'red',
            value: `${pool.poolStorage.totalPower} (${pool.isActiveValidator ? 'sufficient to be validator' : 'insufficient to be validator'})`
          },
          actionText: {
            value: 'Total staking power'
          }
        }}
        items={[
          <ContentBlock key='pool_id' title='Pool Id:' value={poolId}/>,
          <ContentBlock key='quorum_member_status' title='In current quorum:'>
            <Label variant={pool.isCurrentQuorumMember? 'green' : 'red'}>{pool.isCurrentQuorumMember ? 'Yes' : 'No'}</Label>
          </ContentBlock>,
          <ContentBlock key='contract' title='Contract:' value='system/staking'/>,
          <ContentBlock key='shard' title='Creation shard:' value={pool.poolOriginShard}/>,
          [
            <ContentBlock
              key='percentage'
              title='Percentage:'
              value={pool.poolStorage.percentage + '% (takes the pool)'}
            />,
            <ContentBlock
              key='overstake'
              title='Overstake:'
              value={formatNumber(pool.poolStorage.overStake)}
            />
          ],
          <ContentBlock
            key='https_url'
            title='HTTP(S) URL:'
            value={pool.poolStorage.poolURL}
          />,
          <ContentBlock
            key='wss_url'
            title='WS(S) URL:'
            value={pool.poolStorage.wssPoolURL}
          />
        ]}
      >
        <PoolImage width={421} height={426} viewBox='0 0 421 426'  />
      </EntityPageLayout>

      <Box sx={{ mt: 16 }}>
        <Typography variant='h1'>Stakers</Typography>
        <StakersTable poolStakers={pool.poolStorage.stakers} poolOriginShard={pool.poolOriginShard} />
      </Box>
    </PageContainer>
  );
}