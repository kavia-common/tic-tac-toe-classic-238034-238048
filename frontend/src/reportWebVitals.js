/* eslint-disable no-console */

/**
 * Optional performance reporting hook used by CRA.
 * Kept minimal; safe to ignore in this project.
 */
export default function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals")
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      })
      .catch((err) => {
        console.warn("web-vitals failed to load", err);
      });
  }
}
