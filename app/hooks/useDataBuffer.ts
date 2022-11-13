import {useEffect, useState} from 'react';

const useDataBuffer = <T>(data: T): T => {
  const [buffer, setBuffer] = useState<T>(data);
  useEffect(() => {
    if (data) {
      setBuffer(data);
    }
  }, [data]);
  return buffer;
};

export {useDataBuffer};
