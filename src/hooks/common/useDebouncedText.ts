import {useState} from 'react';
import {useDebounce} from '~/libs/hooks/useDebounce';

export const useDebouncedText = (delay = 400) => {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, delay);

  const changeText = (value: string) => setText(value);

  return {
    text,
    debouncedText,
    changeText,
  };
};
