export default function PageStyle({
  css,
  legacyCascade = false,
  legacyBaseShim = false,
  legacyServiceUtilityShim = false,
  legacyShim = legacyCascade
}) {
  if (!css) return null;
  const pageCss = legacyCascade
    ? [
        ":root{--primary-dark:#000827f0;--primary-gold:#d4af37;--primary-ivory:#f8f6f0;--text-light:#fff;--text-muted:#a0a0a0}",
        "body{background:#000827f0;color:var(--text-light);font-family:Inter,sans-serif;line-height:1.6;overflow-x:hidden}",
        css,
        legacyBaseShim ? LEGACY_TAILWIND_BASE_SHIM : "",
        legacyServiceUtilityShim ? LEGACY_SERVICE_UTILITY_SHIM : "",
        legacyShim ? LEGACY_TAILWIND_CDN_SHIM : ""
      ].join("\n")
    : css;

  return <style data-page-css dangerouslySetInnerHTML={{ __html: pageCss }} />;
}

const LEGACY_TAILWIND_BASE_SHIM = `
html{line-height:1.5}
body{line-height:inherit}
`;

const LEGACY_SERVICE_UTILITY_SHIM = `
@media (min-width:768px){.md\\:text-6xl{font-size:3.75rem;line-height:1}}
@media (min-width:768px){.md\\:text-7xl{font-size:4.5rem;line-height:1}}
@media (min-width:1024px){.lg\\:text-5xl{font-size:3rem;line-height:1}}
`;

const LEGACY_TAILWIND_CDN_SHIM = `
html{line-height:1.5}
body{line-height:inherit}
.text-5xl{font-size:3rem;line-height:1}
.text-6xl{font-size:3.75rem;line-height:1}
.text-7xl{font-size:4.5rem;line-height:1}
@media (min-width:768px){.md\\:text-6xl{font-size:3.75rem;line-height:1}}
@media (min-width:1024px){.lg\\:text-5xl{font-size:3rem;line-height:1}.lg\\:text-7xl{font-size:4.5rem;line-height:1}}
.space-y-1\\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.375rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.375rem * var(--tw-space-y-reverse))}
.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.75rem * var(--tw-space-y-reverse))}
.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}
.space-y-6>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.5rem * var(--tw-space-y-reverse))}
.space-y-8>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-top:calc(2rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(2rem * var(--tw-space-y-reverse))}
`;
