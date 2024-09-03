import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { Grid, Typography } from '@mui/material';
import { Label } from '@/components/ui';
import LaunchIcon from '@mui/icons-material/Launch';

type Props = {
  children?: ReactNode,
  header: {
    title: string,
    value: string,
    label: {
      variant: 'red' | 'green' | 'blue',
      value: string | number
    },
    actionText?: {
      url?: string,
      value: string
    }
  },
  items: Array<ReactNode | Array<ReactNode>>
}

export const EntityPageLayout: FC<Props> = ({
  children: entityImage,
  header,
  items
}) => {
  const layoutHeader = (
    <Grid item xs={12}>
      <Typography variant='caption'>{header.title}</Typography>
      <Typography variant='h1' sx={{ my: 0.25, wordBreak: 'break-all' }}>{header.value}</Typography>
      <Label variant={header.label.variant}>{header.label.value}</Label>
      {header.actionText && (
        <>
          {header.actionText.url ? (
            <Link
              href={header.actionText.url}
              style={{ textDecoration: 'none', marginLeft: '1rem' }}
            >
              <Typography variant='caption' color='primary.main'>
                <LaunchIcon
                  color='primary'
                  sx={{ fontSize: '16px', position: 'relative', bottom: '-3px' }}
                /> {header.actionText.value}
              </Typography>
            </Link>
          ) : (
            <Typography variant='caption' color='primary.main' sx={{ ml: 1 }}>
              {header.actionText.value}
            </Typography>
          )}
        </>
      )}
    </Grid>
  );

  const withImage = !!entityImage;

  const computeMarginTopForFirstItem = (index: number) => index === 0 ? { mt: 1.5 } : {};
  const computeColumnWidth = (itemsCount: number) => itemsCount > 1 ? {
    [withImage ? 'md' : 'lg']: Number((12 / itemsCount).toFixed(2))
  } : {};

  const layoutContent = items.map((item, idx) => {
    const nestedItems = Array.isArray(item) ? item : [item];

    const gridProps = {
      item: true,
      sx: computeMarginTopForFirstItem(idx),
      xs: 12,
      ...computeColumnWidth(nestedItems.length)
    }

    return nestedItems.map((nestedItem, nestedIdx) => (
      <Grid {...gridProps} key={`${idx}${nestedIdx}`}>
        {nestedItem}
      </Grid>
    ));
  }).flat();

  const innerLayout = (
    <Grid container spacing={1}>
      {layoutHeader}
      {layoutContent}
    </Grid>
  );

  if (withImage) {
    return (
      <Grid container spacing={8}>
        <Grid item order={{ xs: 2, lg: 1 }} xs={12} lg={8} xl={7}>
          {innerLayout}
        </Grid>

        <Grid item order={{ xs: 1, lg: 2 }} xs={12} lg={4} xl={5} sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {entityImage}
        </Grid>
      </Grid>
    );
  }

  return innerLayout;
}