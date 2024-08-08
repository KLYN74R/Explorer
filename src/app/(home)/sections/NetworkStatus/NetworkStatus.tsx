import { FC } from 'react';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { GreenGradientBackground } from '@/components';

const linksToPages: Record<string, string> = {
  'Blocks data and stats': '/blocks',
  'Epoches data': '#',
  'KLY-EVM data': '#',
  'Hostchains checkpoints': '#',
  'Symbiotic chains': '#',
  'RWX smart contracts': '#',
  'Multistaking stats': '#',
  'Voting & DAO': '#',
  'Mutations': '#',
  'Abstractions': '#'
}

export const NetworkStatus = () => {
  return (
    <GreenGradientBackground sx={{ p: 3 }}>
      <Typography variant='h1' sx={{ fontWeight: 800, mb: 2 }}>
        Network Info
      </Typography>
      {Object.keys(linksToPages).map(title => (
        <ContentLink title={title} url={linksToPages[title]} key={title} />
      ))}
    </GreenGradientBackground>
  );
}

const ContentLink: FC<{ title: string, url: string }> = ({
  title,
  url
}) => {
  return (
    <Typography
      color="text.primary"
      sx={{
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
        textDecorationThickness: '1px',
        lineHeight: '33px',
        display: 'block',
        my: 1.25
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