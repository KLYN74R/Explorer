import { Metadata } from 'next';
import { fetchShardAccountById } from '@/data';
import { Container, Grid, Typography } from '@mui/material';
import { formatOrdinal, truncateMiddle } from '@/helpers';
import { ContentBlock, Label } from '@/components/ui';
import { Contract } from '@/definitions';
import ContractImage from '@public/icons/pages/contract.svg';

export const metadata: Metadata = {
  title: 'Contract info',
};

type Props = {
  params: {
    id: string
  }
}

export default async function ContractByIdPage({ params }: Props) {
  const [shard, contractId] = decodeURIComponent(params.id).split(':');
  const contract = await fetchShardAccountById(shard, contractId) as Contract;

  const lang = contract.lang === 'ASC' ? 'AssemblyScript' : 'Rust';

  return (
    <Container maxWidth='xl' sx={{ py: 6 }}>
      <Grid container spacing={8} sx={{ px: { md: 4.5, xs: 0 } }}>
        <Grid item order={{ xs: 2, lg: 1 }} xs={12} lg={8} xl={7}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant='caption'>Contract info</Typography>
              <Typography variant='h1' sx={{ my: 0.25, wordBreak: 'break-all' }}>{truncateMiddle(contractId)}</Typography>
              <Label variant='green'>Contract</Label>
            </Grid>

            <Grid item xs={12} sx={{ mt: 1.5 }}>
              <ContentBlock
                title='Contract Id:'
                value={contractId}
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
                value={contract.balance + ' KLY'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ContentBlock
                title='UNO:'
                value={contract.uno}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ContentBlock
                title='Last payment for storage usage:'
                value={formatOrdinal(contract.storageAbstractionLastPayment) + ' epoch'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ContentBlock
                title='Abstract gas:'
                value={contract.gas}
              />
            </Grid>
            <Grid item xs={12}>
              <ContentBlock title='List of storage cells:'>
                {contract.storages.map(storage =>
                  <Typography key={storage} color='primary.main'>• {storage}</Typography>
                )}
              </ContentBlock>
            </Grid>
            <Grid item xs={12}>
              <ContentBlock title='Language:'>
                <Label variant={lang === 'AssemblyScript' ? 'blue' : 'red'}>{lang}</Label>
              </ContentBlock>
            </Grid>
          </Grid>
        </Grid>

        <Grid item order={{ xs: 1, lg: 2 }} xs={12} lg={4} xl={5} sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ContractImage width={489} height={489} viewBox='0 0 489 489' />
        </Grid>
      </Grid>
    </Container>
  );
}