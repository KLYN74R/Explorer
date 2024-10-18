'use client';
import { FC, Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { SocialButtons } from './SocialButtons';
import {
  Box,
  Collapse,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  SxProps,
  Typography,
} from '@mui/material';
import { FlexColumnBox, OutlinedButton } from '@/components/ui';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import KlyntarFoundationLogo from '@public/icons/company/KlyntarFoundationLogo.svg';
import MenuIcon from '@public/icons/ui/menu.svg';
import Close from '@public/icons/ui/close.svg';
import KlyntarIconSm from '@public/icons/company/KlyntarIconSm.svg';
import { KLY_LINKS } from '@/config';
import { BG_COLORS } from '@/styles';

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

const isCurrentNetwork = (network: string) => {
  const isTestnet = window.location.hostname.includes('testnet');
  return (
    (network === 'testnet' && isTestnet) ||
    (network === 'mainnet' && !isTestnet)
  );
};

const DesctopNetworksList: FC<{ sx?: SxProps }> = ({ sx }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ ...sx }}>
      <OutlinedButton
        id='networks-button'
        aria-controls={open ? 'networks-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        icon={<KlyntarIconSm />}
        sx={{
          background: open ? BG_COLORS.CYAN : BG_COLORS.SILVER,
          ':hover': { background: BG_COLORS.CYAN },
        }}
        onClick={handleClick}
      />
      <Menu
        id='networks-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'networks-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {networks.map(({ base, label, url }) => (
          <MenuItem
            key={base}
            component='a'
            href={url}
            onClick={handleClose}
            sx={{ borderRadius: '0px !important' }}
          >
            <Typography
              color={isCurrentNetwork(base) ? 'primary' : 'text.primary'}
            >
              {label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const MobileNetworksList = () => {
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
              ml: 1,
            }}
          >
            <Link
              href={url}
              style={{
                color: 'inherit',
                textDecoration: 'inherit',
                textDecorationThickness: 'inherit',
                cursor: isCurrentNetwork(base) ? 'default' : 'pointer',
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
    id: 'networks',
    label: 'Explore networks',
    element: MobileNetworksList,
  },
  {
    id: 'socials',
    label: 'Follow us',
    element: SocialButtons,
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
            icon={<MenuIcon />}
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
          <DesctopNetworksList />
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
