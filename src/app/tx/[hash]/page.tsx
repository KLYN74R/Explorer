import { Metadata } from 'next';
import { PrettyJSON } from '@/components';
import { ParsedBytecodeDisplay } from './ParsedBytecodeDisplay';
import { ContentBlock, EntityPageLayout, Label, PageContainer } from '@/components/ui';
import { describeTransactionCreatorFormat, fetchTransactionByTxHash } from '@/data';
import { truncateMiddle } from '@/helpers';
import { TX_TYPE } from '@/definitions';

interface Props {
  params: {
    hash: string
  }
}

export const metadata: Metadata = {
  title: 'Transaction info',
};

export default async function TransactionByIdPage({ params }: Props) {
  const txHash = decodeURIComponent(params.hash);
  const tx = await fetchTransactionByTxHash(txHash);

  // In case it's EVM account - make this request to check the EVM account type (if it's EOA or contract)

  

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
          <ContentBlock
            key='shard'
            title='Shard:'
            value={tx.shard}
          />,
          [
            <ContentBlock
              key='creator'
              title='Creator:'
              value={truncateMiddle(tx.creator)}
              comment={tx.creatorFormatDescription}
              url={`/users/${tx.shard}:${tx.creator}`}
            />,
            (
              tx.createdContractAddress ? (
                <ContentBlock
                  key='created_contract_address'
                  title='Created contract:'
                  value={tx.createdContractAddress}
                  url={`/contracts/${tx.shard}:${tx.createdContractAddress}`}
                />
              ) : tx.type === TX_TYPE.EVM_CALL && tx.payload.evmBytecode !== '' ? (
                <ContentBlock
                  key='called_contract'
                  title='Called contract:'
                  value={truncateMiddle(tx.payload.to)}
                  comment={describeTransactionCreatorFormat(tx.payload.to)}
                  url={`/contracts/${tx.shard}:${tx.payload.to}`}
                />
              ) : tx.payload.to ? (
                <ContentBlock
                  key='recipient'
                  title='Recipient:'
                  value={truncateMiddle(tx.payload.to)}
                  comment={describeTransactionCreatorFormat(tx.payload.to)}
                  url={`/users/${tx.shard}:${tx.payload.to}`}
                />
              ) : tx.payload.contractID ? (
                <ContentBlock
                  key='called_contract'
                  title='Called contract:'
                  value={truncateMiddle(tx.payload.contractID)}
                  url={`/contracts/${tx.shard}:${tx.payload.contractID}`}
                />
              ) : null
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
              value={(tx.payload.amount || tx.payload.value || 0) + ' KLY'}
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
          </ContentBlock>,
          (
            tx.type === TX_TYPE.EVM_CALL && tx.payload.evmBytecode !== '' && (
              <ContentBlock key='input_format' title='Input format:'>
                <ParsedBytecodeDisplay bytecode={tx.payload.evmBytecode} />
              </ContentBlock>
            )
          )
        ]}
      />
    </PageContainer>
  );
}