'use client';
import {
  Container,
  Box,
  List,
  Collapse,
  ListItemButton,
  ListItemText,
  ListItem,
  ListSubheader,
  Typography,
} from '@mui/material';
import { FlexColumnBox, OutlinedButton } from '@/components/ui';
import { socialIconsWithLinks } from '@/config/social';
import KlyntarFoundationLogo from '@public/icons/company/KlyntarFoundationLogo.svg';
import { Fragment, useEffect, useState } from 'react';
import Close from '@public/icons/ui/close.svg';
import Menu from '@public/icons/ui/menu.svg';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SocialButtons = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        mr: 1,
      }}
    >
      {socialIconsWithLinks.map(({ icon: Icon, url }) => (
        <OutlinedButton
          key={url}
          icon={<Icon />}
          url={url}
        />
      ))}
    </Box>
  );
};

const TESTNET = 'testnet';

export const networks = [
  {
    url: 'klyntarscan.org',
    base: '',
    label: 'Mainnet',
  },
  {
    url: 'testnet.klyntarscan.org',
    base: TESTNET,
    label: 'Testnet',
  },
];

const MobileNetworksList = () => {
  const pathname = usePathname();
  const isTestnet = pathname.includes(TESTNET);

  return (
    <FlexColumnBox sx={{ width: '100%', gap: 1 }}>
      <Typography
        variant='subtitle2'
        color='text.secondary'
      >
        Networks
      </Typography>
      <FlexColumnBox sx={{ width: '100%', gap: 0.5 }}>
        {networks.map(({ label, base, url }) => (
          <Typography
            key={url}
            style={{
              color:
                // isTestnet &&
                base === TESTNET ? 'text.secondary' : 'text.primary',
              textDecoration: 'none',
              lineHeight: '32px',
              display: 'block',
            }}
          >
            <Link
              href={url}
              style={{
                color: 'inherit',
                textDecoration: 'inherit',
                textDecorationThickness: 'inherit',
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
    label: 'Change network',
    element: MobileNetworksList,
  },
  { id: 'socials', label: 'Socials', element: SocialButtons },
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
                onClick={() =>
                  setOpenedElement(openedElement === id ? null : id)
                }
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
