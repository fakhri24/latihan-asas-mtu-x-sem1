/**
 * Memasang pengaman error global peramban dengan dukungan pembersihan AbortSignal.
 * @param {(message: string) => void} onErrorMessage
 * @param {AbortSignal} signal
 */
export function attachErrorBoundary(onErrorMessage, signal) {
  window.addEventListener(
    "error",
    (event) => {
      const msg = event.message || "Terjadi kesalahan runtime yang tidak terduga.";
      onErrorMessage(`Kesalahan aplikasi: ${msg}`);
    },
    { signal },
  );

  window.addEventListener(
    "unhandledrejection",
    (event) => {
      const reason = event.reason instanceof Error ? event.reason.message : String(event.reason);
      onErrorMessage(`Proses asinkron gagal: ${reason}`);
    },
    { signal },
  );
}
