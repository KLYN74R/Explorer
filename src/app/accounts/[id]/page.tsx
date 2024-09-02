import { Metadata } from 'next';
import { fetchShardAccountById, fetchUserTransactions } from '@/data';
import { Box, Container, Grid, Typography } from '@mui/material';
import { truncateMiddle } from '@/helpers';
import { ContentBlock, Label } from '@/components/ui';
import { TransactionsTable } from './TransactionsTable';
import { Account } from '@/definitions';
import AccountImage from '@public/icons/pages/account.svg';

export const metadata: Metadata = {
  title: 'Account info',
};

type Props = {
  params: {
    id: string
  }
}

export default async function AccountByIdPage({ params }: Props) {
  const [shard, accountId] = decodeURIComponent(params.id).split(':');
  const account = await fetchShardAccountById(shard, accountId) as Account;
  const transactions  = await fetchUserTransactions(shard, accountId);

  return (
    <Container maxWidth='xl' sx={{ py: 6 }}>
      <Grid container spacing={8} sx={{ px: { md: 4.5, xs: 0 } }}>
        <Grid item order={{ xs: 2, lg: 1 }} xs={12} lg={8} xl={7}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant='caption'>Account info</Typography>
              <Typography variant='h1' sx={{ my: 0.25, wordBreak: 'break-all' }}>{truncateMiddle(accountId)}</Typography>
              <Label variant='green'>User</Label>
            </Grid>

            <Grid item xs={12} sx={{ mt: 1.5 }}>
              <ContentBlock
                title='Account Id:'
                value={accountId}
              />
            </Grid>
            <Grid item xs={12}>
              <ContentBlock
                title='Shard:'
                value={shard}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ContentBlock
                title='Balance:'
                value={account.balance + ' KLY'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ContentBlock
                title='UNO:'
                value={account.uno}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ContentBlock
                title='Nonce:'
                value={account.nonce}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ContentBlock
                title='Abstract gas:'
                value={account.gas}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item order={{ xs: 1, lg: 2 }} xs={12} lg={4} xl={5} sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <AccountImage width={421} height={426} viewBox='0 0 421 426' />
        </Grid>
      </Grid>

      <Box sx={{
        mt: 16,
        px: { md: 4.5, xs: 0 }
      }}>
        <Typography variant='h1'>Transactions</Typography>
        <TransactionsTable transactions={transactions} />
      </Box>
    </Container>
  );
}