import { Metadata } from 'next';
import { Container, Typography, Grid } from '@mui/material';
import { PrettyJSON } from '@/components';
import { ContentBlock, Label } from '@/components/ui';
import { fetchTransactionByBlake3Hash } from '@/data';
import { truncateMiddle } from '@/helpers';

type TransactionByIdPageProps = {
  params: {
    hash: string
  }
}

export const metadata: Metadata = {
  title: 'Transaction info',
};

export default async function TransactionByIdPage({ params }: TransactionByIdPageProps) {
  const blake3Hash = decodeURIComponent(params.hash);
  const tx = await fetchTransactionByBlake3Hash(blake3Hash);

  return (
    <Container maxWidth='xl' sx={{ py: 6 }}>
      <Grid container spacing={1} sx={{ px: { md: 4.5, xs: 0 } }}>
        <Grid item xs={12} sx={{ mb: 1.5 }}>
          <Typography variant='caption'>Transaction info</Typography>
          <Typography variant='h1' sx={{ my: 0.25, wordBreak: 'break-all' }}>{truncateMiddle(tx.blake3Hash)}</Typography>
          <Label variant={tx.isOk ? 'green' : 'red'}>{tx.isOk ? 'Success' : 'Failed'}</Label>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ContentBlock
            title='Creator:'
            value={tx.creator}
            comment={tx.creatorFormatDescription}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ContentBlock
            title='Version:'
            value={tx.v}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ContentBlock
            title='Type:'
            value={tx.type}
            comment={tx.typeDescription}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ContentBlock
            title='Nonce: '
            value={tx.nonce}
          />
        </Grid>
        <Grid item xs={12}>
          <ContentBlock
            title='Signature:'
            value={tx.sig}
          />
        </Grid>
        <Grid item xs={12}>
          <ContentBlock
            title='256 bit Blake3 hash:'
            value={tx.blake3Hash}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ContentBlock
            title='Included in block:'
            value={tx.block.truncatedId}
            url={`/blocks/${tx.block.id}`}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ContentBlock
            title='Position in block:'
            value={tx.order}
          />
        </Grid>
        <Grid item xs={12}>
          <ContentBlock title='Payload:'>
            <PrettyJSON data={tx.payload} />
          </ContentBlock>
        </Grid>
      </Grid>
    </Container>
  );
}