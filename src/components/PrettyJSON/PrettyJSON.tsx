import { FC } from 'react';
import JsonFormatter from 'react-json-formatter';
import { COLORS } from '@/styles';

export const PrettyJSON: FC<{ data: object }> = ({
  data
}) => {
  return (
    <JsonFormatter
      json={JSON.stringify(data)}
      tabWith={4}
      jsonStyle={{
        style: {
          fontFamily: 'monospace',
          width: '100%',
          overflow: 'auto',
          paddingBottom: '10px'
        },
        numberStyle: {color: COLORS.CYAN},
        nullStyle: {color: COLORS.RED},
        propertyStyle: {color: 'rgba(255, 255, 255, 0.8)'}
      }}
    />
  )
}