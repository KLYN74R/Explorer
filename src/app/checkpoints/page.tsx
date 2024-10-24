import { FC, Suspense } from 'react';
import Link from 'next/link';
import { ButtonPagination, FlexCenterBox, Label, PageContainer } from '@/components/ui';
import { Box, Grid, Typography } from '@mui/material';
import { BG_COLORS } from '@/styles';
import BTCIcon from '@public/icons/currencies/BTC.svg';
import ETHIcon from '@public/icons/currencies/ETH.svg';
import SOLIcon from '@public/icons/currencies/SOL.svg';
import LaunchIcon from '@mui/icons-material/Launch';

interface Checkpoint {
  hostchain: string;
  hash: string;
  isSuccessful: boolean;
  url: string;
}

const checkpointsData: Checkpoint[] = [
  {
    hostchain: 'BTC',
    hash: 'b43cede8cb0cfbe5b4f96cc5a37c0e35f8a153b65844899058681b0a9880015a',
    isSuccessful: true,
    url: '#'
  },
  {
    hostchain: 'ETH',
    hash: '0xc9e984f8c47a5488042d090e301fcd9bfb3f0a4b2b06c487e1bf6e16b27f9fdb',
    isSuccessful: true,
    url: '#'
  },
  {
    hostchain: 'SOL',
    hash: '3GTDR7Etmhw2Y4nxmyTN58TyvRqp8n7pL3dMaUc2C6CcJq6RwxKSb18QCmD1xLB2j9wAkFzoGe1qR8gAWK62GBzv',
    isSuccessful: true,
    url: '#'
  },
];

const icons: {[hostchain: string]: any} = {
  'BTC': <BTCIcon />,
  'ETH': <ETHIcon />,
  'SOL': <SOLIcon />
}

export default function CheckpointsPage() {
  return (
    <>
      <PageContainer sx={{ py: 6 }}>
        <Typography variant='h1'>Checkpoints to hostchains</Typography>
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ display: 'inline' }}>
            These checkpoints help the network to prevent long range attacks
          </Typography>
          {' '}
          <Typography sx={{ display: { xs: 'inline', md: 'block' }  }}>
            and prove you that the history has only one variant
          </Typography>
        </Box>

        <EpochCheckpoints
          epochId={70}
          checkpoints={checkpointsData}
        />
        <EpochCheckpoints
          epochId={69}
          checkpoints={checkpointsData.map((c, i) => i === 2 ? {...c, isSuccessful: false} : c)}
        />
        <EpochCheckpoints
          epochId={68}
          checkpoints={checkpointsData.map((c, i) => i === 1 || i === 2 ? {...c, isSuccessful: false} : c)}
        />
      </PageContainer>

      <FlexCenterBox sx={{ mt: 2 }}>
        <Suspense>
          <ButtonPagination />
        </Suspense>
      </FlexCenterBox>
    </>
  );
}

interface CheckpointsPerEpochProps {
  epochId: number;
  checkpoints: Checkpoint[];
}

const EpochCheckpoints: FC<CheckpointsPerEpochProps> = ({
  epochId,
  checkpoints
}) => {
  const total = checkpoints.length;
  const successful = checkpoints.filter(c => c.isSuccessful).length;

  const color = successful === total
    ? 'primary.main'
    : successful === total - 1
    ? 'rgba(252, 255, 80, 1)'
    : 'secondary.main';

  const bgColor = (isSuccessful: boolean) => isSuccessful
    ? 'rgba(122, 238, 229, 0.2)'
    : 'rgba(255, 49, 49, 0.2)';

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant='h2'>Epoch {epochId} <Typography variant='caption' color='secondary.main'>(Simulated data)</Typography></Typography>
      <Typography sx={{ fontWeight: 300, mt: 2}}>Checkpoints:</Typography>

      <Typography
        sx={{ fontWeight: 700, mt: 0.5 }}
        color={color}
      >
        {successful}/{total}
      </Typography>

      <Box sx={{ mt: 3 }}>
        {checkpoints.map(checkpoint => (
          <Grid container
            key={checkpoint.hash}
            sx={{
              mt: 1,
              pr: 3,
              background: BG_COLORS.GRAY_LIGHT,
              minHeight: '85px'
            }}
          >
            <Grid item
              xs={3} md={2} lg={1.5} xl={1}
              sx={{
                background: bgColor(checkpoint.isSuccessful),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {icons[checkpoint.hostchain]}
            </Grid>
            <Grid item
              xs={9} md={10} lg={10.5} xl={11}
              sx={{
                display: 'flex',
                alignItems: 'center',
                pl: { xs: 2, md: 4 },
                py: 2
              }}
            >
              {checkpoint.isSuccessful ? (
                <Link
                  href={checkpoint.url}
                  passHref
                  target='_blank'
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant='h6'
                    color='primary.main'
                    sx={{
                      fontSize: { xs: '20px', md: '24px' },
                      fontWeight: 400,
                      wordBreak: 'break-all',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    <LaunchIcon color='primary' sx={{ position: 'relative', bottom: { xs: '-5px', md: '-3px' } }} />
                    {' '}
                    {checkpoint.hash}
                  </Typography>
                </Link>
              ) : (
                <Label variant='red'>
                  N/A
                </Label>
              )}
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}