export default function PageStyle({
  css,
  blogDetailCascade = false,
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
        legacyShim ? LEGACY_TAILWIND_CDN_SHIM : "",
        blogDetailCascade ? BLOG_DETAIL_UI_SHIM : ""
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

const BLOG_DETAIL_UI_SHIM = `
.legacy-page-content{background:radial-gradient(circle at top left,rgba(212,175,55,.08),transparent 34rem),linear-gradient(180deg,#050c1f 0%,#071022 42%,#030712 100%);color:#fff;overflow-x:clip}
.legacy-page-content>section:first-of-type{box-sizing:border-box;isolation:isolate;height:340px!important;min-height:0!important;max-height:340px!important;display:grid;place-items:center;padding-top:5.6rem!important;padding-bottom:2.8rem!important;background-position:center!important;background-size:cover!important;background-repeat:no-repeat!important;border-bottom:1px solid rgba(212,175,55,.14);box-shadow:inset 0 -54px 90px rgba(3,7,18,.28);overflow:hidden!important}
.legacy-page-content>section:first-of-type:after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 0,rgba(212,175,55,.2),transparent 32rem),linear-gradient(180deg,rgba(5,12,31,.18),rgba(3,7,18,.74));pointer-events:none;z-index:1}
.legacy-page-content>section:first-of-type>div.absolute{position:absolute!important;inset:0!important;width:100%!important;max-width:none!important;margin:0!important;padding:0!important;z-index:0}
.legacy-page-content>section:first-of-type>div:not(.absolute){position:relative;z-index:2;width:min(100%,1180px)!important;max-width:1180px!important;margin-left:auto!important;margin-right:auto!important;padding-left:clamp(1rem,4vw,2rem)!important;padding-right:clamp(1rem,4vw,2rem)!important;text-align:center;justify-self:center}
.legacy-page-content>section:first-of-type>div:not(.absolute)>div{margin-left:auto!important;margin-right:auto!important}
.legacy-page-content>section:first-of-type .max-w-3xl,.legacy-page-content>section:first-of-type .max-w-4xl{max-width:860px!important;margin-left:auto!important;margin-right:auto!important;text-align:center}
.legacy-page-content>section:first-of-type .mx-auto{margin-left:auto!important;margin-right:auto!important}
.legacy-page-content>section:first-of-type img{width:100%;height:100%;max-height:340px;object-fit:cover;filter:saturate(1.05) contrast(1.04);transform:scale(1.01)}
.legacy-page-content>section:first-of-type h1{color:#fff;font-size:clamp(1.95rem,3.8vw,3.55rem);letter-spacing:0;line-height:1.08;margin-top:0!important;margin-bottom:.8rem!important;text-wrap:balance;text-shadow:0 18px 45px rgba(0,0,0,.42)}
.legacy-page-content>section:first-of-type .inline-block{margin-bottom:.95rem!important;padding:.25rem .85rem;font-size:.78rem;line-height:1.45}
.legacy-page-content>section:first-of-type .flex.items-center.justify-center{gap:.75rem;row-gap:.35rem;flex-wrap:wrap;line-height:1.45}
.legacy-page-content>section:first-of-type p,.legacy-page-content>section:first-of-type .mb-4,.legacy-page-content>section:first-of-type .mb-6{margin-bottom:.8rem!important}
.legacy-page-content>section:first-of-type .text-gray-400{color:#d4d8e5}
.legacy-page-content>section:nth-of-type(2){position:relative;padding-top:5rem;padding-bottom:5.75rem}
.legacy-page-content>section:nth-of-type(2):before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.018),transparent 32rem);pointer-events:none}
.legacy-page-content .article-content{width:min(100%,880px);max-width:880px;margin-inline:auto;padding:clamp(1.35rem,3vw,3rem);background:linear-gradient(180deg,rgba(9,18,40,.82),rgba(5,12,31,.66));border:1px solid rgba(212,175,55,.18);border-radius:28px;box-shadow:0 28px 90px rgba(0,0,0,.36);overflow:hidden;overflow-wrap:break-word}
.legacy-page-content .article-content .back-link{display:inline-flex;align-items:center;gap:.55rem;margin-bottom:2.25rem;padding:.62rem 1rem;border:1px solid rgba(212,175,55,.32);border-radius:999px;background:rgba(212,175,55,.08);color:#f5d28d;text-decoration:none;box-shadow:0 10px 28px rgba(0,0,0,.16)}
.legacy-page-content .article-content .back-link:hover{background:rgba(212,175,55,.14);border-color:rgba(245,210,141,.58);color:#ffe4a7;transform:translateY(-1px)}
.legacy-page-content .article-content h2{font-size:clamp(1.65rem,2.6vw,2.35rem);line-height:1.18;margin-top:3rem;margin-bottom:1.05rem;color:#f5d28d;text-wrap:balance}
.legacy-page-content .article-content h2:first-of-type{margin-top:.25rem}
.legacy-page-content .article-content h3{font-size:clamp(1.25rem,2vw,1.65rem);line-height:1.25;color:#fff}
.legacy-page-content .article-content p,.legacy-page-content .article-content li{font-size:1.03rem;line-height:1.86;color:#d7dce8}
.legacy-page-content .article-content p{margin-bottom:1.35rem}
.legacy-page-content .article-content ul,.legacy-page-content .article-content ol{padding-left:1.45rem;margin:1.15rem 0 1.55rem}
.legacy-page-content .article-content li::marker{color:#f5d28d}
.legacy-page-content .article-content strong{color:#fff;font-weight:700}
.legacy-page-content .article-content a:not(.back-link){color:#f5d28d;text-decoration-color:rgba(245,210,141,.45);text-underline-offset:3px;transition:color .2s ease,text-decoration-color .2s ease}
.legacy-page-content .article-content a:not(.back-link):hover{color:#ffe4a7;text-decoration-color:#ffe4a7}
.legacy-page-content .article-content img{display:block;width:100%;height:auto;margin:2rem auto;border-radius:22px;border:1px solid rgba(255,255,255,.12);box-shadow:0 24px 60px rgba(0,0,0,.34)}
.legacy-page-content .article-content table{width:100%;max-width:100%;display:block;overflow-x:auto;border-collapse:separate;border-spacing:0;margin:1.75rem 0 2rem;border:1px solid rgba(212,175,55,.2);border-radius:18px;background:rgba(3,7,18,.32);box-shadow:0 16px 44px rgba(0,0,0,.22)}
.legacy-page-content .article-content th{background:rgba(212,175,55,.16);color:#f5d28d;font-weight:700}
.legacy-page-content .article-content th,.legacy-page-content .article-content td{min-width:180px;padding:.9rem 1rem;border-color:rgba(255,255,255,.1)}
.legacy-page-content .article-content blockquote{margin:2rem 0;padding:1.35rem 1.5rem;border-left:4px solid #d4af37;border-radius:18px;background:rgba(212,175,55,.08);color:#f2f4f8}
.legacy-page-content .article-content .contact-box{border-radius:24px;border-color:rgba(212,175,55,.34);background:linear-gradient(135deg,rgba(212,175,55,.14),rgba(255,255,255,.035));box-shadow:0 18px 50px rgba(0,0,0,.24)}
.legacy-page-content .sitewide-trust-section{position:relative;border-top:1px solid rgba(212,175,55,.08);overflow:hidden}
.legacy-page-content .sitewide-trust-section article,.legacy-page-content .sitewide-trust-section details{backdrop-filter:blur(10px);box-shadow:0 18px 50px rgba(0,0,0,.22);transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease}
.legacy-page-content .sitewide-trust-section article:hover,.legacy-page-content .sitewide-trust-section details:hover{border-color:rgba(245,210,141,.44)!important;box-shadow:0 24px 64px rgba(0,0,0,.3);transform:translateY(-3px)}
.legacy-page-content .sitewide-trust-section img{max-width:100%;height:auto;object-fit:cover}
.legacy-page-content .footer,.legacy-page-content .site-footer{border-top:1px solid rgba(212,175,55,.14)}
@media (max-width:768px){.legacy-page-content>section:first-of-type{height:300px!important;max-height:300px!important;padding-top:5.05rem!important;padding-bottom:2.25rem!important}.legacy-page-content>section:first-of-type img{max-height:300px}.legacy-page-content>section:first-of-type h1{font-size:clamp(1.8rem,6vw,2.6rem);line-height:1.1}.legacy-page-content>section:first-of-type .inline-block{margin-bottom:.7rem!important}.legacy-page-content>section:nth-of-type(2){padding-top:2rem;padding-bottom:3rem}.legacy-page-content .article-content{border-radius:22px;padding:1.35rem}.legacy-page-content .article-content p,.legacy-page-content .article-content li{font-size:1rem;line-height:1.78}.legacy-page-content .article-content table{margin-left:-.35rem;width:calc(100% + .7rem)}}
@media (max-width:480px){.legacy-page-content .article-content{border-left:0;border-right:0;border-radius:0;margin-left:-1rem;margin-right:-1rem;width:calc(100% + 2rem)}.legacy-page-content>section:first-of-type{height:280px!important;max-height:280px!important;padding-top:4.9rem!important;padding-bottom:1.85rem!important}.legacy-page-content>section:first-of-type img{max-height:280px}.legacy-page-content>section:first-of-type h1{font-size:1.72rem;line-height:1.12;margin-bottom:.65rem!important}.legacy-page-content>section:first-of-type .inline-block{font-size:.72rem;margin-bottom:.6rem!important}.legacy-page-content>section:first-of-type .flex{gap:.45rem;flex-wrap:wrap}.legacy-page-content .sitewide-trust-section{padding-top:3rem;padding-bottom:3rem}}
`;
