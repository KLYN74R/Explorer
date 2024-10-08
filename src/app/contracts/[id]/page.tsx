import { Metadata } from 'next';
import { fetchShardAccountById, fetchAccountTransactions } from '@/data';
import { Box, Typography } from '@mui/material';
import { formatOrdinal, truncateMiddle } from '@/helpers';
import { ContentBlock, EntityPageLayout, Label, PageContainer, TransactionsTable } from '@/components/ui';
import { Contract } from '@/definitions';
import ContractImage from '@public/icons/pages/contract.svg';
import NotFoundPage from '@/app/not-found';

export const metadata: Metadata = {
  title: 'Account info',
};

type PageProps = {
  params: {
    id: string
  }
}

export default async function ContractByIdPage({ params }: PageProps) {
  const decodedComponent = decodeURIComponent(params.id)

  let shardId, contractId;

  if(!decodedComponent.includes(':')){
    shardId = 'x';
    contractId = decodedComponent;
  } else {
    let [shardID, contractID] = decodedComponent.split(':');
    shardId = shardID;
    contractId = contractID;
  }

  const contract = await fetchShardAccountById(shardId, contractId) as Contract;
  const transactions  = await fetchAccountTransactions(shardId, contractId);

  if(contract.type !== 'contract') return <NotFoundPage/>

  return (
    <PageContainer sx={{ py: 6 }}>
      <EntityPageLayout
        header={{
          title: 'Account info',
          value: truncateMiddle(contractId),
          label: {
            variant: 'green',
            value: 'Contract'
          }
        }}
        items={[
          <ContentBlock key='contract_id' title='Contract Id:' value={contractId}/>,
          <ContentBlock key='aliases' title='Also known as:'>
            <Label variant='blue'>N/A</Label>
          </ContentBlock>,
          <ContentBlock key='shard' title='Shard:' value={shardId}/>,
          [
            <ContentBlock key='balance' title='Balance:' value={contract.balance + ' KLY'}/>,
            <ContentBlock key='uno' title='UNO:' value={contract.uno}/>
          ],
          [
            <ContentBlock
              key='last_payment_for_storage_usage'
              title='Last payment for storage usage:'
              value={formatOrdinal(contract.storageAbstractionLastPayment) + ' epoch'}
            />,
            <ContentBlock
              key='abstract_gas'
              title='Abstract gas:'
              value={contract.gas}
            />
          ],
          <ContentBlock key='list_of_storage_cells' title='List of storage cells:'>
            {contract.storages.map(storage =>
              <Typography key={storage} color='primary.main'>• {storage}</Typography>
            )}
          </ContentBlock>,
          <ContentBlock key='language' title='Language:'>
            <Label variant={getColorForLanguage(contract.lang)}>{contract.lang}</Label>
          </ContentBlock>
        ]}
      >
        <ContractImage width={421} height={426} viewBox='0 0 421 426' />
      </EntityPageLayout>

      <Box sx={{ mt: 16 }}>
        <Typography variant='h1'>Transactions</Typography>
        <Typography sx={{ mt: 1, mb: 3 }}>Browse through the latest 200 transactions below</Typography>
        <TransactionsTable transactions={transactions.reverse()} />
      </Box>
    </PageContainer>
  );
}

function getColorForLanguage(lang: string): 'blue' | 'red' | 'orange' | 'silver' | 'green' {
  const langLower = lang.toLowerCase();
  return langLower === 'assemblyscript' ? 'blue' :
    langLower === 'rust' ? 'red' :
      langLower === 'solidity' ? 'orange' :
        langLower.includes('system') ? 'silver' :
          'green';
}