import { FC } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { FlexCenterBox } from '@/components/ui';
import KlyntarIcon from '@public/icons/company/KlyntarIcon.svg';
import { KLY_LINKS } from '@/config';

export const Footer = () => {
  return (
    <Container sx={{ pb: 5, pt: 20 }} maxWidth='xl'>
      <Grid container spacing={{ lg: 2, xs: 5 }}>
        <Grid item xs={12} lg={5.4}>
          <Box>
            <FlexCenterBox sx={{
              gap: 0.5,
              justifyContent: 'flex-start'
            }}>
              <KlyntarIcon />
              <Typography variant='h2'>Built with 🤍</Typography>
            </FlexCenterBox>
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              We stand for decentralization, open-source development and community interests.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.2}>
          <Box>
            <Typography variant='h2' sx={{ mb: 2 }}>FAQ</Typography>
            <FooterLink title="How to run a validator" url={KLY_LINKS.HOW_TO_RUN_A_VALIDATOR} />
            <FooterLink title="Multistaking" url={KLY_LINKS.MULTISTAKING} />
            <FooterLink title="Unstaking" url={KLY_LINKS.UNSTAKING} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.2}>
          <Box>
            <Typography variant='h2' sx={{ mb: 2 }}>Sites</Typography>
            <FooterLink title="Main Site" url={KLY_LINKS.LANDING} />
            <FooterLink title="GitHub" url={KLY_LINKS.GITHUB} />
            <FooterLink title="CoinMarketCap" url={KLY_LINKS.CMC} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.2}>
          <Box>
            <Typography variant='h2' sx={{ mb: 2 }}>Ecosystem</Typography>
            <FooterLink title="Tokens" url={KLY_LINKS.TOKENS} />
            <FooterLink title="RWX Contracts" url={KLY_LINKS.RWX_CONTRACTS} />
            <FooterLink title="Services" url={KLY_LINKS.SERVICES} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

const FooterLink: FC<{
  title: string,
  url: string
}> = ({ title, url }) => {
  return (
    <Typography
      color='text.primary'
      sx={{
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
        textDecorationThickness: '1px',
        lineHeight: '33px',
        display: 'block'
      }}
    >
      <Link
        href={url}
        passHref
        style={{
          color: 'inherit',
          textDecorationThickness: 'inherit'
        }}
      >
        {title}
      </Link>
    </Typography>
  );
}