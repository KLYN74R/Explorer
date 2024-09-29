import { Metadata } from 'next';
import { PrettyJSON } from '@/components';
import { ContentBlock, EntityPageLayout, Label, PageContainer } from '@/components/ui';
import { describeTransactionCreatorFormat, fetchTransactionByTxHash } from '@/data';
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
          actionText: {
            url: `/tx/${tx.txHash}/details`,
            value: 'View raw details'
          }
          
        }}
        items={[
          [
            <ContentBlock
              key='creator'
              title='Creator:'
              value={truncateMiddle(tx.creator)}
              comment={tx.creatorFormatDescription}
              url={`/users/${tx.shard}:${tx.creator}`}
              
            />,

            (

              tx.payload.to && <ContentBlock
                key='recipient'
                title='Recipient:'
                value={truncateMiddle(tx.payload.to)}
                comment={describeTransactionCreatorFormat(tx.payload.to)}
                url={`/users/${tx.shard}:${tx.payload.to}`}
            
              /> || tx.payload.contractID && <ContentBlock
                
                key='called_contract'
                title='Called contract:'
                value={truncateMiddle(tx.payload.contractID)}
                url={`/contracts/${tx.shard}:${tx.payload.contractID}`}
          
              /> || tx.createdContractAddress && <ContentBlock 
              
                key='created_contract_address'
                title='Created contract:'
                value={tx.createdContractAddress} 
                url={`/contracts/${tx.shard}:${tx.createdContractAddress}`}


              />

            )
          
          ],
          [
            <ContentBlock
              key='type'
              title='Type:'
              value={tx.type}
              comment={tx.typeDescription}
            />,
            
            <ContentBlock
              key='version'
              title='Coins transferred:'
              value={(tx.payload.amount || 0) + ' KLY'}
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
<ContentBlock key='parallelization_type' title='Execution type:'>
            <Label variant={ Array.isArray(tx.payload.touchedAccounts) ? 'green' : 'red' }>{Array.isArray(tx.payload.touchedAccounts) ? 'Parallel execution⚡' : 'Non-parallel execution 🦥'}</Label>
          </ContentBlock>,
          <ContentBlock key='fee_details' title='Fee details:'>
            <Label variant='blue'>{tx.payload.gasAbstraction ? 'Account Abstraction 2.0 🪄' : 'Fee paid in native coin 💸'}</Label>
          </ContentBlock>
          
          ],
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