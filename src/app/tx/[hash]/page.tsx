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
          },
          ...(!tx.isOk ? {
              actionText: {
                url: `/tx/${tx.txHash}/fail-reason`,
                value: 'Check reason'
              }} : {}
            )
        }}
        items={[
          [
            <ContentBlock
              key='creator'
              title='Creator:'
              value={truncateMiddle(tx.creator)}
              comment={tx.creatorFormatDescription}
              url={`/accounts/${tx.shard}:${tx.creator}`}
              
            />,
            <ContentBlock
              key='version'
              title='Version:'
              value={tx.v}
            />
          ],
          [
            <ContentBlock
              key='type'
              title='Type:'
              value={tx.type}
              comment={tx.typeDescription}
            />,
            <ContentBlock
              key='nonce'
              title='Nonce: '
              value={tx.nonce}
            />
          ],
          <ContentBlock
            key='signature'
            title='Signature:'
            value={tx.sig}
          />,
          <ContentBlock
            key='256_bit_tx_hash'
            title='256 bit tx hash:'
            value={tx.txHash}
          />,
          [
            <ContentBlock
              key='included_in_block'
              title='Included in block:'
              value={tx.block.truncatedId}
              url={`/blocks/${tx.block.id}`}
            />,
            <ContentBlock
              key='position_in_block'
              title='Position in block:'
              value={tx.order}
            />
          ],
          <ContentBlock key='payload' title='Payload:'>
            <PrettyJSON data={tx.payload} />
          </ContentBlock>
        ]}
      />
    </PageContainer>
  );
}