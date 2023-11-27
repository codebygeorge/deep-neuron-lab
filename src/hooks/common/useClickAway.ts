import { RefObject, useEffect, useState } from 'react';

/**
 * Listens for clicks outside the element.
 * @property disable Function to temporarily disable click away listener.
 * @property enable Function to enable click away listener that was previously disabled.
 */
type ClickAwayListener = {
  disable: () => void;
  enable: () => void;
};

/**
 * Listens for clicks outside the element.
 * @param ref Target html element ref.
 * @param onClickAway Click away callback.
 * @param disabledByDefault disabled by default.
 * @return Listener disable and enable function.
 */
const useClickAway = (
  ref: RefObject<HTMLElement>,
  onClickAway: () => void,
  disabledByDefault?: boolean,
): ClickAwayListener => {
  const [disabled, setDisabled] = useState<boolean>(disabledByDefault ?? false);
  const disable = () => setDisabled(true);
  const enable = () => setDisabled(false);
  const onAway = (e: MouseEvent | PointerEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(e.target as Element)) onClickAway();
  };
  const events: ('mousedown' | 'pointerdown' | 'touchstart')[] = [
    'mousedown',
    'pointerdown',
    'touchstart',
  ];
  const addEventListeners = () =>
    events.forEach((event) => document.addEventListener(event, onAway));
  const removeEventListeners = () =>
    events.forEach((event) => document.removeEventListener(event, onAway));
  useEffect(() => {
    if (!ref || !ref.current) return;
    if (disabled) removeEventListeners();
    else addEventListeners();
    // eslint-disable-next-line consistent-return
    return removeEventListeners;
  }, [ref.current, disabled]);
  return { disable, enable };
};

export default useClickAway;
