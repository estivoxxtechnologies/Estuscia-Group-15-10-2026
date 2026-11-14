import { useEffect, useState } from 'react';
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof matchMedia === 'undefined' ? false : matchMedia(query).matches);
  useEffect(() => { const mq = matchMedia(query), h = () => setMatches(mq.matches); mq.addEventListener('change', h); return () => mq.removeEventListener('change', h); }, [query]);
  return matches;
}
