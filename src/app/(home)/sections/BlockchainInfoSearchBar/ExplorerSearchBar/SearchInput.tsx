import React, { ChangeEvent, FC, KeyboardEvent } from 'react';
import { TextField } from '@mui/material';

export const SearchInput: FC<{
  placeholder: string
  isChoose: boolean,
  query: string,
  handleQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: KeyboardEvent) => void;
}> = ({
  placeholder,
  isChoose,
  query,
  handleQueryChange,
  handleKeyDown,
}) => {
  return (
    <TextField
      placeholder={placeholder}
      value={query}
      onChange={handleQueryChange}
      onKeyDown={handleKeyDown}
      spellCheck={false}
      autoComplete="off"
      sx={{ flex: 1 }}
      inputProps={{
        maxLength: 200,
        style: {fontSize: '14px'},
        readOnly: isChoose,
        disableUnderline: true
      }}
    />
  );
}
