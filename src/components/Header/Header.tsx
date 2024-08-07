import { Container, Box } from '@mui/material';
import { GeometricButton, FlexBetweenBox, FlexCenterBox, OutlinedButton } from '@/components/ui';
import { KLY_LINKS, socialIconsWithLinks } from '@/config/social';
import KlyntarFoundationLogo from '@public/icons/company/KlyntarFoundationLogo.svg';

export const Header = () => {
  return (
    <Container sx={{ py: 3.5 }} maxWidth='xl'>
      <FlexBetweenBox>
        <KlyntarFoundationLogo />
        <FlexCenterBox>
          <SocialButtons />
          <GeometricButton
            url={KLY_LINKS.DISCORD}
            variant='white'
            sx={{ py: 0.5, px: 8 }}
          >
            Follow us
          </GeometricButton>
        </FlexCenterBox>
      </FlexBetweenBox>
    </Container>
  );
}

const SocialButtons = () => {
  return (
    <Box>
      {socialIconsWithLinks.map(({ icon, url }) => (
        <OutlinedButton
          key={url}
          icon={icon()}
          url={url}
          sx={{ mr: 1 }}
        />
      ))}
    </Box>
  );
}