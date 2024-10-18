'use client';
import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { SocialButtons } from './SocialButtons';
import { Box, Collapse, Container, List, ListItem, ListItemButton, ListItemText, Typography, } from '@mui/material';
import { FlexColumnBox, OutlinedButton } from '@/components/ui';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import KlyntarFoundationLogo from '@public/icons/company/KlyntarFoundationLogo.svg';
import Menu from '@public/icons/ui/menu.svg';
import Close from '@public/icons/ui/close.svg';
import { KLY_LINKS } from '@/config';

const networks = [
  {
    url: KLY_LINKS.EXPLORER_MAINNET,
    base: 'mainnet',
    label: 'Klyntar Mainnet',
  },
  {
    url: KLY_LINKS.EXPLORER_TESTNET,
    base: 'testnet',
    label: 'Klyntar Testnet',
  },
];

const MobileNetworksList = () => {
  const isTestnet = window.location.hostname.includes('testnet');
  const isCurrentNetwork = (network: string) => {
    return (network === 'testnet' && isTestnet) || (network === 'mainnet' && !isTestnet);
  }

  return (
    <FlexColumnBox sx={{ width: '100%', gap: 1 }}>
      <FlexColumnBox sx={{ width: '100%', gap: 0.5 }}>
        {networks.map(({ label, base, url }) => (
          <Typography
            key={url}
            color={isCurrentNetwork(base) ? 'primary' : 'text.primary'}
            sx={{
              textDecoration: 'none',
              lineHeight: '32px',
              display: 'block',
              ml: 1
            }}
          >
            <Link
              href={url}
              style={{
                color: 'inherit',
                textDecoration: 'inherit',
                textDecorationThickness: 'inherit',
                cursor: isCurrentNetwork(base) ? 'default' : 'pointer'
              }}
            >
              {label}
            </Link>
          </Typography>
        ))}
      </FlexColumnBox>
    </FlexColumnBox>
  );
};

const mobileHeaderElements = [
  {
    id: 'network',
    label: 'Explore networks',
    element: MobileNetworksList,
  },
  {
    id: 'socials',
    label: 'Follow us',
    element: SocialButtons
  },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openedElement, setOpenedElement] = useState<string | null>(null);

  useEffect(() => {
    const resizeHandler = () => setIsOpen(false);
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <Container
      sx={{ pt: 2.5, pb: 3.5 }}
      maxWidth='xl'
    >
      <Container
        sx={{
          gap: { xs: 2, md: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link href='/'>
          <KlyntarFoundationLogo />
        </Link>
        {isOpen ? (
          <OutlinedButton
            icon={<Close />}
            onClick={() => setIsOpen(false)}
            sx={{ display: { md: 'none' } }}
          />
        ) : (
          <OutlinedButton
            icon={<Menu />}
            onClick={() => setIsOpen(true)}
            sx={{ display: { md: 'none' } }}
          />
        )}
        <Box
          sx={{
            display: { display: 'none', md: 'flex' },
          }}
        >
          <SocialButtons />
        </Box>
      </Container>
      <Collapse
        in={isOpen}
        timeout='auto'
        unmountOnExit
        sx={{ display: { md: 'none' } }}
      >
        <List
          sx={{ width: '100%', borderBottom: 1 }}
          component='div'
        >
          {mobileHeaderElements.map(({ id, label, element: Element }) => (
            <Fragment key={id}>
              <ListItemButton
                onClick={() => setOpenedElement(openedElement === id ? null : id)}
              >
                <ListItemText primary={label} />
                {openedElement === id ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={openedElement === id}
                timeout='auto'
                unmountOnExit
              >
                <ListItem component='div'>
                  <Element />
                </ListItem>
              </Collapse>
            </Fragment>
          ))}
        </List>
      </Collapse>
    </Container>
  );
};
