import { Box } from '@mui/material';
import { socialIconsWithLinks } from '@/config/social';
import { OutlinedButton } from '@/components/ui';

export const SocialButtons = () => {
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