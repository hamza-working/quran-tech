'use client';

import { useSyncExternalStore } from 'react';

const subscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
};

/** Current URL hash (without '#'); empty on the server. Lets sections be deep-linked, e.g. /ar/islam#morning */
export function useHash() {
  return useSyncExternalStore(subscribe, () => window.location.hash.slice(1), () => '');
}

export function setHash(hash: string) {
  if (hash) {
    window.location.hash = hash;
  } else {
    history.pushState(null, '', window.location.pathname + window.location.search);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
}
