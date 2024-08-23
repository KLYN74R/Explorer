import { Metadata } from 'next';
import Link from 'next/link';
import { ContentBlock, Label, } from '@/components/ui';
import { Container, Grid, Box, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { TransactionsTable } from './TransactionsTable';
import BlockImage from '@public/block.svg';
import { fetchBlockById } from '@/data';
import { truncateMiddle } from '@/helpers';

type BlockByIdPageProps = {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Block info',
};

export default async function BlockByIdPage({ params }: BlockByIdPageProps) {
  const id = decodeURIComponent(params.id);
  const block = await fetchBlockById(id);

  const status = !!block.finalizationProof.proofs ? 'Approved' : 'Awaiting approval';

  const truncatedBlockId = `${block.epochIndex}:${truncateMiddle(block.creator)}:${block.index}`;

  return (
    <Container maxWidth='xl' sx={{ py: 6 }}>
      <Grid container sx={{ px: { md: 4.5, xs: 0 } }} spacing={8}>
        <Grid item order={{ xs: 2, lg: 1 }} xs={12} lg={8} xl={7}>
          <Grid container spacing={1}>

            <Grid item xs={12}>
              <Typography variant='caption'>Block info</Typography>
              <Typography variant='h1' sx={{ my: 0.25, wordBreak: 'break-all' }}>{truncatedBlockId}</Typography>
              <Label variant={status === 'Approved' ? 'green' : 'red'}>{status}</Label>
              <Link
                href={`/blocks/${id}/finalization-proof`}
                style={{ textDecoration: 'none', marginLeft: '1rem' }}
              >
                <Typography variant='caption' color='primary.main'>
                  <LaunchIcon
                    color='primary'
                    sx={{ fontSize: '16px', position: 'relative', bottom: '-3px' }}
                  /> Check AFP
                </Typography>
              </Link>
            </Grid>

            <Grid item xs={12} sx={{ mt: 1.5 }}>
              <ContentBlock
                title='Creator:'
                value={block.creator}
              />
            </Grid>
            <Grid item xs={12}>
              <ContentBlock
                title='Created at:'
                value={block.createdAt}
              />
            </Grid>
            <Grid item xs={12}>
              <ContentBlock
                title='Epoch:'
                value={block.epoch}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Grid item xs={12} sm={6}>
                <ContentBlock
                  title='Txs Number:'
                  value={block.txsNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ContentBlock
                  title='Index in own sequence:'
                  value={block.index}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ContentBlock
                title='Previous block hash:'
                value={block.prevHash}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item order={{ xs: 1, lg: 2 }} xs={12} lg={4} xl={5} sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'center', lg: 'flex-end' }
        }}>
          <BlockImage width={421} height={426} viewBox='0 0 421 426' />
        </Grid>
      </Grid>

      <Box sx={{
        mt: 16,
        px: { md: 4.5, xs: 0 }
      }}>
        <Typography variant='h1'>Transactions</Typography>
        <TransactionsTable transactions={block.transactions} />
      </Box>
    </Container>
  );
}