import { Metadata } from 'next';
import { ContentBlock, PageContainer } from '@/components/ui';
import { Grid, Typography } from '@mui/material';
import { PrettyJSON } from '@/components';
import { fetchTransactionByTxHash } from '@/data';

type FailedTransactionReasonPageProps = {
  params: {
    hash: string;
  }
}

export const metadata: Metadata = {
  title: 'Why transaction failed?',
};

export default async function FailedTransactionReasonPage({ params }: FailedTransactionReasonPageProps) {
  const id = decodeURIComponent(params.hash);
  const tx = await fetchTransactionByTxHash(id);


  return (
    <PageContainer sx={{ py: 6 }}>
      <Typography variant='h1'>Reason of failed execution</Typography>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <ContentBlock
            title='Transaction:'
            value={tx.txHash}
            url={`/tx/${tx.txHash}`}
          />
        </Grid>
        <Grid item xs={12}>
          <ContentBlock>
            <PrettyJSON data={{reason:tx.reason}} />
          </ContentBlock>
        </Grid>
      </Grid>
    </PageContainer>
  );
}