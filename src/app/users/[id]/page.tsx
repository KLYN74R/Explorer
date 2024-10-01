import { Metadata } from 'next';
import { fetchShardAccountById, fetchAccountTransactions } from '@/data';
import { Box, Typography } from '@mui/material';
import { truncateMiddle } from '@/helpers';
import { ContentBlock, EntityPageLayout, Label, PageContainer, TransactionsTable } from '@/components/ui';
import { Account} from '@/definitions';
import AccountImage from '@public/icons/pages/account.svg';
import React from 'react';
import NotFoundPage from '@/app/not-found';

export const metadata: Metadata = {
  title: 'Account info',
};

type PageProps = {
  params: {
    id: string
  }
}


export default async function AccountByIdPage({ params }: PageProps) {
  const [shard, accountId] = decodeURIComponent(params.id).split(':');
  const account = await fetchShardAccountById(shard, accountId) as Account;
  const transactions  = await fetchAccountTransactions(shard, accountId);

  if(account.type !== 'eoa') return <NotFoundPage/>

  return (
    <PageContainer sx={{ py: 6 }}>
      <EntityPageLayout
        header={{
          title: 'Account info',
          value: truncateMiddle(accountId),
          label: {
            variant: 'green',
            value: 'User'
          }
        }}
        items={[
          <ContentBlock key='account_id' title='Account Id:' value={accountId}/>,
          <ContentBlock key='aliases' title='Also known as:'>
            <Label variant='blue'>N/A</Label>
          </ContentBlock>,
          <ContentBlock key='shard' title='Shard:' value={shard}/>,
          [
            <ContentBlock key='balance' title='Balance:' value={account.balance + ' KLY'}/>,
            <ContentBlock key='uno' title='UNO:' value={account.uno}/>
          ],
          [
            <ContentBlock key='nonce' title='Nonce:' value={account.nonce}/>,
            <ContentBlock key='abstract_gas' title='Abstract gas:' value={account.gas}/>
          ]
        ]}
      >
        <AccountImage width={421} height={426} viewBox='0 0 421 426' />
      </EntityPageLayout>

      <Box sx={{ mt: 16 }}>
        <Typography variant='h1'>Transactions</Typography>
        <Typography sx={{ mt: 1, mb: 3 }}>Browse through the latest 200 transactions below</Typography>
        <TransactionsTable transactions={transactions.reverse()} />
      </Box>
    </PageContainer>
  );
}