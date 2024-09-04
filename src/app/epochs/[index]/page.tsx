import { Metadata } from 'next';
import { GoBackButton, InfoBlock, PageContainer } from '@/components/ui';
import { Grid, Typography } from '@mui/material';
import { fetchEpochByIndex } from '@/data';
import { FormattedDate } from '@/helpers';
import { ShardValidatorsSection } from './ShardValidatorsSection';

type PageProps = {
  params: {
    index: string;
  }
}

export const metadata: Metadata = {
  title: 'Epoch info',
};

export default async function PoolByIdPage({ params }: PageProps) {
  const id = decodeURIComponent(params.index);
  const epoch = await fetchEpochByIndex(Number(id));

  const previousEpochRoute = `/epochs/${epoch.id - 1 >= 0 ? epoch.id - 1 : 0}`;
  const startedAt = new FormattedDate(epoch.startTimestamp).UTCHoursMinutesSeconds;

  return (
    <PageContainer sx={{ py: 6 }}>
      <GoBackButton
        url={previousEpochRoute}
        label='Previous Epoch'
        sx={{ mb: 2 }}
        disabled={epoch.isFirst}
      />
      <Typography variant='h1'>{epoch.isCurrent ? `Current ` : ''}Epoch Data</Typography>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <InfoBlock
            title='Started at'
            value={startedAt}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoBlock
            title='Epoch Index'
            value={epoch.id}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoBlock
            title='Shards'
            value={epoch.shardsNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoBlock
            title='Quorum Size'
            value={epoch.quorumSize}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoBlock
            title='Total Validators'
            value={epoch.validatorsNumber}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoBlock
            title='Blocks number'
            value={epoch.totalBlocksNumber}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoBlock
            title='Transactions number'
            value={epoch.totalTxsNumber}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoBlock
            title='Txs success rate'
            value={epoch.txsSuccessRate}
          />
        </Grid>
        <Grid item xs={12}>
          <InfoBlock
            title='Epoch Hash'
            value={epoch.hash}
          />
        </Grid>
      </Grid>

      <ShardValidatorsSection epoch={epoch} />
    </PageContainer>
  );
}