import { Metadata } from 'next';

export const metadataConfig: Metadata = {
  metadataBase: new URL('https://www.klyntarscan.org'),
  title: {
    template: '%s | KLY Explorer',
    default: 'KLY Explorer',
  },
  description:
    'Discover real-time insights into our blockchain with our comprehensive explorer. Track and analyze blocks, transactions, and network status effortlessly. Our explorer provides detailed data and powerful tools to monitor blockchain activity, ensuring transparency and informed decision-making.',
  openGraph: {
    title: 'KLYNTAR Blockchain Explorer',
    description:
      'Discover real-time insights into our blockchain with our comprehensive explorer. Track and analyze blocks, transactions, and network status effortlessly. Our explorer provides detailed data and powerful tools to monitor blockchain activity, ensuring transparency and informed decision-making.',
    type: 'website',
    url: 'https://www.klyntarscan.org',
    images: [
      {
        url: 'opengraph-image.png',
        width: 1600,
        height: 960,
        alt: 'KLYNTAR | EXPLORER',
      }
    ]
  }
};