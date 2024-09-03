import { Metadata } from 'next';
import { fetchShardAccountById } from '@/data';
import { Typography } from '@mui/material';
import { formatOrdinal, truncateMiddle } from '@/helpers';
import { ContentBlock, EntityPageLayout, Label, PageContainer } from '@/components/ui';
import { Contract } from '@/definitions';
import ContractImage from '@public/icons/pages/contract.svg';

export const metadata: Metadata = {
  title: 'Contract info',
};

type PageProps = {
  params: {
    id: string
  }
}

export default async function ContractByIdPage({ params }: PageProps) {
  const [shard, contractId] = decodeURIComponent(params.id).split(':');
  const contract = await fetchShardAccountById(shard, contractId) as Contract;

  const lang = contract.lang === 'ASC' ? 'AssemblyScript' : 'Rust';

  return (
    <PageContainer sx={{ py: 6 }}>
      <EntityPageLayout
        header={{
          title: 'Contract info',
          value: truncateMiddle(contractId),
          label: {
            variant: 'green',
            value: 'Contract'
          }
        }}
        items={[
          <ContentBlock title='Contract Id:' value={contractId}/>,
          <ContentBlock title='Shard:' value={shard}/>,
          [
            <ContentBlock title='Balance:' value={contract.balance + ' KLY'}/>,
            <ContentBlock title='UNO:' value={contract.uno}/>
          ],
          [
            <ContentBlock
              title='Last payment for storage usage:'
              value={formatOrdinal(contract.storageAbstractionLastPayment) + ' epoch'}
            />,
            <ContentBlock
              title='Abstract gas:'
              value={contract.gas}
            />
          ],
          <ContentBlock title='List of storage cells:'>
            {contract.storages.map(storage =>
              <Typography key={storage} color='primary.main'>• {storage}</Typography>
            )}
          </ContentBlock>,
          <ContentBlock title='Language:'>
            <Label variant={lang === 'AssemblyScript' ? 'blue' : 'red'}>{lang}</Label>
          </ContentBlock>
        ]}
      >
        <ContractImage width={421} height={426} viewBox='0 0 421 426' />
      </EntityPageLayout>
    </PageContainer>
  );
}