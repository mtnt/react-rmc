import { useEffect, useMemo, useState } from 'react';
import { type Module as RMCModule } from 'redux-module-creator';

export function useRMCUpdater<F extends () => any>(func: F, modules: RMCModule[], extras: any[] = []): ReturnType<F> {
  const updateMarkers = modules.map(mdl => {
    const [updateMarker, setUpdateMarker] = useState(0);

    useEffect(() => {
      return mdl.subscribe(() => {
        setUpdateMarker(Math.random());
      });
    }, []);

    return updateMarker;
  });

  return useMemo(func, [func, ...updateMarkers, ...extras]);
}
