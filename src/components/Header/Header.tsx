import Container from '@mui/material/Container';
import KlyntarFoundationLogo from '@public/icons/company/KlyntarFoundationLogo.svg';
import { SocialButtons } from '@/components';
import { GeometricButton, FlexBetweenBox, FlexCenterBox } from '@/components/ui';
import { KLY_LINKS } from '@/config/social';

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