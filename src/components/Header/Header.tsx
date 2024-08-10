import { Container, Box } from '@mui/material';
import Link from 'next/link';
import { GeometricButton, FlexColumnBox, FlexCenterBox, OutlinedButton } from '@/components/ui';
import { KLY_LINKS, socialIconsWithLinks } from '@/config/social';
import KlyntarFoundationLogo from '@public/icons/company/KlyntarFoundationLogo.svg';

export const Header = () => {
  return (
    <Container sx={{ pt: 2.5, pb: 3.5 }} maxWidth='xl'>
      <FlexColumnBox sx={{
        gap: { xs: 2, md: 4 },
        alignItems: { md: 'center' },
        justifyContent: { md: 'space-between'},
        flexDirection: { md: 'row' }
      }}>
        <Link href='/'>
          <KlyntarFoundationLogo />
        </Link>
        <FlexCenterBox>
          <SocialButtons />
          <GeometricButton
            url={KLY_LINKS.DISCORD}
            variant='white'
            sx={{ py: 0.5, px: 8, minWidth: '200px' }}
            wrapperSx={{ display: { xs: 'none', md: 'block' } }}
          >
            Follow us
          </GeometricButton>
        </FlexCenterBox>
      </FlexColumnBox>
    </Container>
  );
}

const SocialButtons = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 1,
      mr: 1
    }}>
      {socialIconsWithLinks.map(({ icon, url }) => (
        <OutlinedButton
          key={url}
          icon={icon()}
          url={url}
        />
      ))}
    </Box>
  );
}