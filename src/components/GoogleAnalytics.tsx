import Script from "next/script";

/**
 * Shape of a GA4 measurement ID: "G-" followed by alphanumerics.
 *
 * Used as an allow-list, not a formatting nicety. The ID is interpolated into
 * an inline script, so anything outside this character set — a stray quote from
 * a mistyped dashboard value, most obviously — must never reach the page. A
 * value that fails this test disables analytics rather than emitting a broken
 * or hostile tag.
 */
const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/i;

/**
 * IMPORTANT — NEXT_PUBLIC_* values are inlined at BUILD time, not read at
 * runtime, so setting the ID in the hosting dashboard requires a redeploy
 * before analytics starts reporting. This must stay a static
 * `process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID` reference; a dynamic lookup is
 * not inlined and reads as undefined in the browser.
 */
const rawMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

const measurementId =
  rawMeasurementId && GA_MEASUREMENT_ID_PATTERN.test(rawMeasurementId)
    ? rawMeasurementId
    : undefined;

/**
 * Google Analytics 4 via the Google tag (gtag.js).
 *
 * Renders the two-part official snippet with `next/script` rather than raw
 * `<script>` tags, so Next.js controls when it loads. Both parts use the
 * default `afterInteractive` strategy: the tag is fetched right after
 * hydration, which is early enough to record the pageview but late enough that
 * it never blocks first paint. `beforeInteractive` would be wrong here —
 * analytics is not critical to rendering the page.
 *
 * The measurement ID comes from NEXT_PUBLIC_GA_MEASUREMENT_ID. When it is
 * missing or malformed — local development, preview builds, CI, a typo in the
 * hosting dashboard — this renders nothing, so development traffic never lands
 * in the production property and a bad value cannot break the page.
 *
 * The ID is `JSON.stringify`-ed into the inline script rather than pasted into
 * a quoted literal. Combined with the pattern check above that is redundant by
 * design: the interpolation stays safe even if the allow-list is ever loosened.
 *
 * @returns The gtag.js script pair, or `null` when no valid measurement ID is
 * configured.
 */
export function GoogleAnalytics() {
  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
          measurementId,
        )}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(measurementId)});
          `,
        }}
      />
    </>
  );
}
