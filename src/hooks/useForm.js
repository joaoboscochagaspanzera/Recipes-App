import { useCallback, useState } from 'react';

const useForm = ({ initialValue } = {}) => {
  const [value, setValue] = useState(initialValue || '');

  const onChange = useCallback(({ target }) => setValue(target.value), []);

  return {
    value,
    onChange,
  };
};

export { useForm };
