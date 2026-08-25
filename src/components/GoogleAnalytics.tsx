import Script from "next/script";

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
 * unset — local development, preview builds, CI — this renders nothing, so
 * development traffic never lands in the production property.
 *
 * IMPORTANT — NEXT_PUBLIC_* values are inlined at BUILD time, not read at
 * runtime, so setting the ID in the hosting dashboard requires a redeploy
 * before analytics starts reporting. The reference below must stay a static
 * `process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID`; a dynamic lookup is not inlined
 * and reads as undefined in the browser.
 */
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
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
            gtag('config', '${measurementId}');
          `,
        }}
      />
    </>
  );
}
