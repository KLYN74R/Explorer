import { Box } from '@mui/material';
import { socialIconsWithLinks } from '@/config';
import { OutlinedButton } from '@/components/ui';

export const SocialButtons = () => {
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