// Google tag bootstrap: Google Ads + Google Analytics 4. Kept as a file rather than an inline <script>
// so the Content-Security-Policy in public/_headers can forbid inline scripts.
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'AW-18234308546');
// GA4 shares the gtag.js loaded in index.html (one script serves both IDs).
gtag('config', 'G-563YDBBFPE');
