import { Metadata } from 'next';
import { ContentBlock, TransactionsTable, EntityPageLayout, PageContainer } from '@/components/ui';
import { Box, Typography } from '@mui/material';
import { fetchBlockById } from '@/data';
import { TransactionPreview } from '@/definitions';
import BlockImage from '@public/icons/pages/block.svg';

type PageProps = {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Block info',
};

export default async function BlockByIdPage({ params }: PageProps) {
  const id = decodeURIComponent(params.id);
  const block = await fetchBlockById(id);

  const status = !!block.aggregatedFinalizationProof.proofs ? 'Approved' : 'Awaiting approval';

  const txPreviews: TransactionPreview[] = block.transactions.map(tx => ({
    txid: tx.txHash,
    txType: tx.type,
    sigType: tx.payload.sigType,
    fee: tx.fee,
    creator: tx.creator
  }));

  return (
    <PageContainer sx={{ py: 6 }}>
      <EntityPageLayout
        header={{
          title: 'Block info',
          value: block.truncatedId,
          label: {
            variant: status === 'Approved' ? 'green' : 'red',
            value: status
          },
          actionText: {
            url: `/blocks/${id}/aggregated-finalization-proof`,
            value: 'Check AFP'
          }
        }}
        items={[
          <ContentBlock title='Creator:' value={block.creator}/>,
          <ContentBlock title='Created at:' value={block.createdAt}/>,
          <ContentBlock title='Epoch:' value={block.epoch}/>,
          [
            <ContentBlock title='Txs Number:' value={block.txsNumber}/>,
            <ContentBlock title='Index in own sequence:' value={block.index}/>,
          ],
          <ContentBlock title='Previous block hash:' value={block.prevHash}/>
        ]}
      >
        <BlockImage width={421} height={426} viewBox='0 0 421 426' />
      </EntityPageLayout>

      <Box sx={{ mt: 16 }}>
        <Typography variant='h1'>Transactions</Typography>
        <TransactionsTable transactions={txPreviews} />
      </Box>
    </PageContainer>
  );
}