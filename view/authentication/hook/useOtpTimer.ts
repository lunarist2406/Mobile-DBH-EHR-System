import { useEffect, useState } from 'react';

export function useOtpTimer(seconds = 60) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    if (time === 0) return;
    const t = setInterval(() => setTime((v) => v - 1), 1000);
    return () => clearInterval(t);
  }, [time]);

  const reset = () => setTime(seconds);

  return { time, reset };
}
