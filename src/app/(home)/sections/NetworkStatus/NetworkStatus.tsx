import { FC } from 'react';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { GreenGradientBackground } from '@/components/ui';
import { BlockchainData } from '@/definitions';
import LaunchIcon from '@mui/icons-material/Launch';

type Props = {
  data: BlockchainData
}

export const NetworkStatus:FC<Props> = ({ data }) => {
  const linksToPages: Record<string, string> = {
    'Blocks data and stats': '/blocks',
    'Epoches data': '/epochs/' + data.epochId,
    'Hostchain checkpoints': '/checkpoints',
    'Symbiotic chains': '#',
    'RWX smart contracts': '#',
    'Multistaking stats': '#',
    'Voting & DAO': '#',
    'Mutations': '#',
    'Charts': '#'
  }

  return (
    <GreenGradientBackground sx={{ p: 3 }}>
      <Typography variant='h1' sx={{ mb: 2 }}>
        Network Info
      </Typography>
      {Object.keys(linksToPages).map(title => (
        <ContentLink
          title={title}
          url={linksToPages[title]}
          key={title}
          disabled={linksToPages[title] === '#'}
        />
      ))}
    </GreenGradientBackground>
  );
}

const ContentLink: FC<{ title: string, url: string, disabled?: boolean }> = ({
  title,
  url,
  disabled
}) => {
  return (
    <Typography
      color={disabled ? 'text.secondary' : 'text.primary'}
      sx={{
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
        textDecorationThickness: '1px',
        textDecorationColor: disabled ? '#11111166' : 'auto',
        fontSize: '18px',
        lineHeight: '33px',
        display: 'block',
        my: 1.25
      }}
    >
      <LaunchIcon sx={{ position: 'relative', bottom: '-4px', height: '20px', mr: '5px' }} />
      <Link
        href={url}
        passHref
        style={{
          color: 'inherit',
          textDecorationThickness: 'inherit',
          cursor: disabled ? 'default' : 'pointer'
        }}
        aria-disabled={disabled}
      >
        {title}
      </Link>
    </Typography>
  );
}