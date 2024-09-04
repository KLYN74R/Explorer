'use client';
import Marquee from 'react-fast-marquee';
import { Typography } from '@mui/material';

const KEY_WORDS = [
  'Web2, Web3 & Real World = 1B users',
  'Ecosystem of blockchains',
  'Post-quantum cryptography',
  'Fast TPS & TTF',
  'Mutability',
  'AI (FHE ML & ZKML)',
  'Multistaking',
  'Cloud',
  'Multilevel sharding',
  'L1 blockchain',
  'EVM & WASM & XVM',
  'Codeless smart-contracts for real world',
  'RWAs',
  'Quantum currency',
];

export const KeyWordsTicker = () => {
  return (
    <Marquee>
      {KEY_WORDS.map((tag) => (
        <Typography
          key={tag}
          variant='body2'
          border={1}
          borderColor='border.main'
          sx={{
            mx: 0.5,
            px: 1.5,
            py: 0.3,
            height: 'fit-content',
            width: 'max-content'
          }}
        >
          {tag}
        </Typography>
      ))}
    </Marquee>
  );
}