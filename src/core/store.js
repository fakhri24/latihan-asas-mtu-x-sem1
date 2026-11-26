/**
 * Membuat reactive store minimalis berbasis EventTarget standar peramban.
 * @template T
 * @param {T} initialState
 * @returns {{
 *   getState: () => T,
 *   setState: (updater: (prevState: T) => T) => void,
 *   subscribe: (listener: (state: T) => void, options?: { signal?: AbortSignal }) => () => void
 * }}
 */
export function createStore(initialState) {
  // EventTarget asli dipakai sebagai bus notifikasi tanpa dependensi eksternal.
  const bus = new EventTarget();
  let currentState = structuredClone(initialState);

  /**
   * Mengembalikan salinan state agar pemanggil tidak memodifikasi state internal secara tidak sengaja.
   * @returns {T}
   */
  function getState() {
    return structuredClone(currentState);
  }

  /**
   * Memperbarui state melalui fungsi murni lalu memancarkan CustomEvent ke seluruh pendengar.
   * @param {(prevState: T) => T} updater
   */
  function setState(updater) {
    const nextState = updater(structuredClone(currentState));
    currentState = structuredClone(nextState);
    bus.dispatchEvent(new CustomEvent("state-change", { detail: getState() }));
  }

  /**
   * Mendaftarkan pendengar perubahan state dengan dukungan pembersihan otomatis via AbortSignal.
   * @param {(state: T) => void} listener
   * @param {{ signal?: AbortSignal }} [options]
   * @returns {() => void}
   */
  function subscribe(listener, options) {
    /** @param {Event} event */
    const onStateChange = (event) => {
      if (!(event instanceof CustomEvent)) return;
      listener(/** @type {T} */ (event.detail));
    };

    const listenerOptions = options?.signal ? { signal: options.signal } : undefined;
    bus.addEventListener("state-change", onStateChange, listenerOptions);

    return () => {
      bus.removeEventListener("state-change", onStateChange);
    };
  }

  return { getState, setState, subscribe };
}
