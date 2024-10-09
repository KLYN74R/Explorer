'use client';
import { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { CodeSnippet } from '@/components/ui';
import { decodeCalldata } from '@/helpers';

type Props = {
  bytecode: string;
};

interface DecodedCalldata {
  funcProto: string,
  funcId: string,
  parameters: Array<{
    index: string,
    value: string
  }>
}

export const ParsedBytecodeDisplay: FC<Props> = ({ bytecode }) => {
  const isEmpty = bytecode === '0x';
  const [functionData, setFunctionData] = useState<DecodedCalldata|null>(null);

  useEffect(() => {
    if (!isEmpty) {
      (async () => {
        const parsedData = await decodeCalldata(bytecode);
        setFunctionData(parsedData);
      })();
    }
  }, [bytecode]);

  if (isEmpty) {
    return <CodeSnippet>No bytecode provided.</CodeSnippet>;
  }

  return (
    <CodeSnippet>
      {functionData ? (
        <>
          <Typography variant='monospace'>Function: {functionData.funcProto}</Typography><br/>
          <Typography variant='monospace'>MethodID: {functionData.funcId}</Typography>
          {functionData.parameters.map(param => (
            <Box key={param.index}>
              <Typography variant='monospace'>{param.index}: {param.value}</Typography>
            </Box>
          ))}
        </>
      ) : (
        <Box>
          <Typography variant='monospace'>Loading...</Typography>
        </Box>
      )}
    </CodeSnippet>
  );
};
