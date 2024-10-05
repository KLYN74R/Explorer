import { Metadata } from 'next';
import { Grid, Typography } from '@mui/material';
import { ContentBlock, PageContainer } from '@/components/ui';
import { PrettyJSON } from '@/components';
import { fetchTransactionByTxHash } from '@/data';

type RawTransactionWithDetailsPageProps = {
  params: {
    hash: string;
  }
}

export const metadata: Metadata = {
  title: 'Raw tx details',
};

export default async function RawTransactionWithDetailsPage({ params }: RawTransactionWithDetailsPageProps) {
  const id = decodeURIComponent(params.hash);
  const tx = await fetchTransactionByTxHash(id);

  const detailsToVisualize = {
    executionStatus: {
      isOk: tx.isOk,
      reason:
      tx.reason,
      blockID: tx.blockID,
      order: tx.order,
      createdContractAddress: tx.createdContractAddress,
      extraDataToReceipt:
      tx.extraDataToReceipt
    },
    txData:{
      version: tx.v,
      txid: tx.txHash,
      txType: tx.type,
      shard: tx.shard,
      creator: tx.creator,
      fee: tx.fee,
      nonce: tx.nonce,
      sigType: tx.sigType,
      sig: tx.sig,
      payload: tx.payload
    }
  }

  return (
    <PageContainer sx={{ py: 6 }}>
      <Typography variant='h1'>Raw transaction with details</Typography>
      <Grid container spacing={1} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <ContentBlock
            title='Transaction ID:'
            value={tx.txHash}
            url={`/tx/${tx.txHash}`}
          />
        </Grid>
        <Grid item xs={12}>
          <ContentBlock>
            <PrettyJSON data={detailsToVisualize} />
          </ContentBlock>
        </Grid>
      </Grid>
    </PageContainer>
  );
}