/**
 * Check if website is running on PWA mode
 * @returns {Boolean}
 */
export const isRunningOnPWA = () => {
  return window.matchMedia("(display-mode: standalone)").matches;
};
