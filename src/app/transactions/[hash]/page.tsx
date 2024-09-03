import { Metadata } from 'next';
import { PrettyJSON } from '@/components';
import { ContentBlock, EntityPageLayout, PageContainer } from '@/components/ui';
import { fetchTransactionByTxHash } from '@/data';
import { truncateMiddle } from '@/helpers';

type PageProps = {
  params: {
    hash: string
  }
}

export const metadata: Metadata = {
  title: 'Transaction info',
};

export default async function TransactionByIdPage({ params }: PageProps) {
  const txHash = decodeURIComponent(params.hash);
  const tx = await fetchTransactionByTxHash(txHash);

  return (
    <PageContainer sx={{ py: 6 }}>
      <EntityPageLayout
        header={{
          title: 'Transaction info',
          value: truncateMiddle(tx.txHash),
          label: {
            variant: tx.isOk ? 'green' : 'red',
            value: tx.isOk ? 'Success' : 'Failed'
          }
        }}
        items={[
          [
            <ContentBlock
              title='Creator:'
              value={tx.creator}
              comment={tx.creatorFormatDescription}
            />,
            <ContentBlock
              title='Version:'
              value={tx.v}
            />
          ],
          [
            <ContentBlock
              title='Type:'
              value={tx.type}
              comment={tx.typeDescription}
            />,
            <ContentBlock
              title='Nonce: '
              value={tx.nonce}
            />
          ],
          <ContentBlock
            title='Signature:'
            value={tx.sig}
          />,
          <ContentBlock
            title='256 bit tx hash:'
            value={tx.txHash}
          />,
          [
            <ContentBlock
              title='Included in block:'
              value={tx.block.truncatedId}
              url={`/blocks/${tx.block.id}`}
            />,
            <ContentBlock
              title='Position in block:'
              value={tx.order}
            />
          ],
          <ContentBlock title='Payload:'>
            <PrettyJSON data={tx.payload} />
          </ContentBlock>
        ]}
      />
    </PageContainer>
  );
}